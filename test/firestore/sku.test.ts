import * as admin from 'firebase-admin'
import * as ballcap from '@1amageek/ballcap-admin'
import * as functions from "firebase-functions-test"
import * as Stripe from 'stripe'
import * as sinon from 'sinon'
import * as index from "../../functions/src/index"
import config from "../config"

const Test = functions({
	databaseURL: 'http://localhost:8080',
	storageBucket: 'my-project.appspot.com',
	projectId: 'my-project',
},
	"./secret.json")

const adminInitStub = sinon.stub(admin, 'initializeApp')
ballcap.initialize(admin.firestore())

import { StockType, Currency } from '@1amageek/tradestore'
import { User } from '../../functions/src/models/User'
import { Product } from '../../functions/src/models/Product'
import { SKU } from '../../functions/src/models/SKU'

Test.mockConfig(config);



describe("Firestore triggerd test", () => {

	const stripe = new Stripe(config.stripe.api_key)
	const user: User = new User("test-user")
	const product: Product = new Product(user.products.collectionReference.doc())

	beforeAll(async () => {
		product.type = "good"
		product.name = "test-product"
		const onCreate = Test.wrap(index.firestore.product.onCreate)
		const snap = Test.firestore.makeDocumentSnapshot(product.data(), product.path)
		await onCreate(snap, {
			auth: {
				uid: 'test-user'
			},
			authType: 'USER'
		})
	}, 10000)

	describe("SKU test", () => {
		const sku: SKU = new SKU(product.SKUs.collectionReference.doc())

		test("onCreate", async () => {
			sku.inventory = { type: StockType.finite, quantity: 1 }
			sku.currency = Currency.JPY
			sku.amount = 1000
			const onCreate = Test.wrap(index.firestore.sku.onCreate)
			const snap = Test.firestore.makeDocumentSnapshot(sku.data(), sku.path)
			await onCreate(snap, {
				auth: {
					uid: 'test-user'
				},
				authType: 'USER'
			})
			const result = await stripe.skus.retrieve(sku.id)
			expect(result.id).toEqual(sku.id)
			expect(result.object).toEqual("sku")
			expect(result.active).toEqual(true)
			expect(result.metadata.product_path).toEqual(`commerce/1/users/test-user/products/${product.id}`)
			expect(result.metadata.sku_path).toEqual(`commerce/1/users/test-user/products/${product.id}/SKUs/${sku.id}`)
			expect(result.inventory.quantity).toEqual(sku.inventory.quantity)
			expect(result.inventory.type).toEqual(sku.inventory.type)
			expect(result.currency).toEqual(sku.currency)
			expect(result.price).toEqual(sku.amount)
		}, 10000)

		test("onUpdate", async () => {
			const onUpdate = Test.wrap(index.firestore.sku.onUpdate)
			const before = Test.firestore.makeDocumentSnapshot(sku.data(), sku.path)
			sku.amount = 2000
			sku.inventory = { type: StockType.infinite }
			const after = Test.firestore.makeDocumentSnapshot(sku.data(), sku.path)
			const snap = Test.makeChange(before, after);
			await onUpdate(snap, {
				auth: {
					uid: 'test-user'
				},
				authType: 'USER'
			})
			const result = await stripe.skus.retrieve(sku.id)
			expect(result.id).toEqual(sku.id)
			expect(result.object).toEqual("sku")
			expect(result.active).toEqual(true)
			expect(result.metadata.product_path).toEqual(`commerce/1/users/test-user/products/${product.id}`)
			expect(result.metadata.sku_path).toEqual(`commerce/1/users/test-user/products/${product.id}/SKUs/${sku.id}`)
			expect(result.inventory.quantity).toEqual(null)
			expect(result.inventory.type).toEqual(sku.inventory.type)
			expect(result.currency).toEqual(sku.currency)
			expect(result.price).toEqual(sku.amount)
		}, 10000)
	})

	afterAll(() => {
		adminInitStub.restore()
		Test.cleanup()
	})
})

