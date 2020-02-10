process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'

import * as admin from '@firebase/testing'
import * as ballcap from '@1amageek/ballcap-admin'
import * as functions from "firebase-functions-test"
import Stripe from 'stripe'
import config from "../config"

const firebase = admin.initializeTestApp({
	projectId: "test-project",
	auth: { uid: "test-user" }
})

// import * as index from "../../functions/src/index"

const Test = functions({
	databaseURL: 'http://localhost:8080',
	storageBucket: 'my-project.appspot.com',
	projectId: 'my-project',
}
	, "./secret.json")

ballcap.initialize(firebase.firestore())
ballcap.setFieldValue(admin.firestore.FieldValue)

import { User } from '../../functions/src/models/User'
import { Product } from '../../functions/src/models/Product'

Test.mockConfig(config);

describe("Firestore triggerd test", () => {
	const stripe = new Stripe(config.stripe.api_key)
	const user: User = new User("test-user")
	describe("Product test success", () => {
		const product: Product = new Product(user.products.collectionReference.doc("test-id"))
		test("onCreate", async () => {
			product.type = "service"
			product.name = "test-product"
			product.save()

			const p: Product = await new Product(product.documentReference).fetch()
			console.log(p.data())
			// const onCreate = Test.wrap(index.firestore.product.onCreate)
			// const snap = Test.firestore.makeDocumentSnapshot(product.data(), product.path)
			// await onCreate(snap, {
			// 	auth: {
			// 		uid: 'test-user'
			// 	},
			// 	authType: 'USER'
			// })
			const result = await stripe.products.retrieve(product.id)
			expect(result.id).toEqual(product.id)
			expect(result.object).toEqual("product")
			expect(result.active).toEqual(true)
			expect(result.metadata.product_path).toEqual(`commerce/1/users/test-user/products/${product.id}`)
			expect(result.name).toEqual(product.name)
			expect(result.type).toEqual(product.type)
		}, 10000)

		// test("onUpdate", async () => {
		// 	const onUpdate = Test.wrap(index.firestore.product.onUpdate)
		// 	const before = Test.firestore.makeDocumentSnapshot(product.data(), product.path)
		// 	product.name = "test-product-update"
		// 	const after = Test.firestore.makeDocumentSnapshot(product.data(), product.path)
		// 	const snap = Test.makeChange(before, after);
		// 	await onUpdate(snap, {
		// 		auth: {
		// 			uid: 'test-user'
		// 		},
		// 		authType: 'USER'
		// 	})
		// 	const result = await stripe.products.retrieve(product.id)
		// 	expect(result.id).toEqual(product.id)
		// 	expect(result.object).toEqual("product")
		// 	expect(result.active).toEqual(true)
		// 	expect(result.metadata.product_path).toEqual(`commerce/1/users/test-user/products/${product.id}`)
		// 	expect(result.name).toEqual(product.name)
		// 	expect(result.type).toEqual(product.type)
		// }, 10000)
	})

	// describe("Product test failure", () => {
	// 	const product: Product = new Product(user.products.collectionReference.doc())
	// 	test("onCreate", async () => {
	// 		product.type = "service"
	// 		product.name = "test-product"
	// 		// await product.save()
	// 		const onCreate = Test.wrap(index.firestore.product.onCreate)
	// 		const data = product.data()
	// 		data.type = "invalid-service"
	// 		const snap = Test.firestore.makeDocumentSnapshot(data, product.path)
	// 		try {
	// 			await onCreate(snap, {
	// 				auth: {
	// 					uid: 'test-user'
	// 				},
	// 				authType: 'USER'
	// 			})
	// 		} catch (_) { }
	// 		const result = await (new Product(user.products.collectionReference.doc())).fetch()
	// 		expect(result.isAvailable).toEqual(false)
	// 	}, 10000)

	// 	test("onUpdate", async () => {
	// 		const onUpdate = Test.wrap(index.firestore.product.onUpdate)
	// 		const before = Test.firestore.makeDocumentSnapshot(product.data(), product.path)
	// 		product.name = "test-product-update"
	// 		const after = Test.firestore.makeDocumentSnapshot(product.data(), product.path)
	// 		const snap = Test.makeChange(before, after);
	// 		await onUpdate(snap, {
	// 			auth: {
	// 				uid: 'test-user'
	// 			},
	// 			authType: 'USER'
	// 		})
	// 		const result = await stripe.products.retrieve(product.id)
	// 		expect(result.id).toEqual(product.id)
	// 		expect(result.object).toEqual("product")
	// 		expect(result.active).toEqual(true)
	// 		expect(result.metadata.product_path).toEqual(`commerce/1/users/test-user/products/${product.id}`)
	// 		expect(result.name).toEqual(product.name)
	// 		expect(result.type).toEqual(product.type)
	// 	}, 10000)
	// })

	afterAll(async () => {
		// admin.clearFirestoreData({
		// 	projectId: 'my-project'
		// })
		// await Promise.all(admin.apps().map(app => app.delete()))
		// Test.cleanup()
	})
})

