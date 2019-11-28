import * as admin from 'firebase-admin'
import * as ballcap from '@1amageek/ballcap-admin'
import * as functions from "firebase-functions-test"
import * as Stripe from 'stripe'
import * as sinon from 'sinon'

import config from "../config"

const Test = functions({
	databaseURL: 'http://localhost:8080',
	storageBucket: 'my-project.appspot.com',
	projectId: 'my-project',
},
	"./secret.json")

const adminInitStub = sinon.stub(admin, 'initializeApp')
ballcap.initialize(admin.firestore())

import * as index from "../../functions/src/index"
import { Currency, Interval } from '@1amageek/tradestore'
import { User } from '../../functions/src/models/User'
import { Product } from '../../functions/src/models/Product'
import { Plan } from '../../functions/src/models/Plan'

Test.mockConfig(config);

describe("Firestore triggerd test", () => {

	const stripe = new Stripe(config.stripe.api_key)
	const user: User = new User("test-user")
	const product: Product = new Product(user.products.collectionReference.doc())

	beforeAll(async () => {
		product.type = "service"
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

	describe("Plan test", () => {

		const plan: Plan = new Plan(product.plans.collectionReference.doc())

		test("onCreate", async () => {
			plan.interval = Interval.month
			plan.intervalCount = 1
			plan.currency = Currency.JPY
			plan.amount = 1000
			plan.isAvailable = true
			const onCreate = Test.wrap(index.firestore.plan.onCreate)
			const snap = Test.firestore.makeDocumentSnapshot(plan.data(), plan.path)
			await onCreate(snap, {
				auth: {
					uid: 'test-user'
				},
				authType: 'USER'
			})
			const result = await stripe.plans.retrieve(plan.id)
			expect(result.id).toEqual(plan.id)
			expect(result.object).toEqual("plan")
			expect(result.active).toEqual(true)
			expect(result.metadata.product_path).toEqual(`commerce/1/users/test-user/products/${product.id}`)
			expect(result.metadata.plan_path).toEqual(`commerce/1/users/test-user/products/${product.id}/plans/${plan.id}`)
			expect(result.interval).toEqual(plan.interval)
			expect(result.interval_count).toEqual(plan.intervalCount)
			expect(result.currency).toEqual(plan.currency)
			expect(result.amount).toEqual(plan.amount)
		}, 10000)

		test("onUpdate", async () => {
			const product: Product = new Product(user.products.collectionReference.doc())
			product.type = "service"
			product.name = "test-product-update"
			const onCreate = Test.wrap(index.firestore.product.onCreate)
			const productSnap = Test.firestore.makeDocumentSnapshot(product.data(), product.path)
			await onCreate(productSnap, {
				auth: {
					uid: 'test-user'
				},
				authType: 'USER'
			})
			const onUpdate = Test.wrap(index.firestore.plan.onUpdate)
			const before = Test.firestore.makeDocumentSnapshot(plan.data(), plan.path)
			plan.amount = 2000
			const after = Test.firestore.makeDocumentSnapshot(plan.data(), plan.path)
			const snap = Test.makeChange(before, after);
			await onUpdate(snap, {
				auth: {
					uid: 'test-user'
				},
				authType: 'USER'
			})
			const result = await stripe.plans.retrieve(plan.id)
			expect(result.id).toEqual(plan.id)
			expect(result.object).toEqual("plan")
			expect(result.active).toEqual(true)
			expect(result.metadata.product_path).toEqual(`commerce/1/users/test-user/products/${product.id}`)
			expect(result.interval).toEqual(plan.interval)
			expect(result.interval_count).toEqual(plan.intervalCount)
			expect(result.currency).toEqual(plan.currency)
			expect(result.amount).toEqual(plan.amount)
		}, 10000)
	})

	afterAll(() => {
		adminInitStub.restore()
		Test.cleanup()
	})
})

