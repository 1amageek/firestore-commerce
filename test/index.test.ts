process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'
import * as ftest from '@firebase/testing'
import * as functions from "firebase-functions-test"

const firebase = ftest.initializeTestApp({
	projectId: "test-project",
	auth: { uid: "test-user" }
})

console.info(firebase.firestore())

describe("Firestore triggerd test", () => {

	test("aa", async () => {
		const doc = firebase.firestore().doc("a/wwwwwwd")
		await doc.set({ a: "b" })

		const result = await doc.get()
		console.log(doc.path, result.data())
	})

})

// import * as admin from 'firebase-admin'
// import * as ballcap from '@1amageek/ballcap-admin'
// import * as functions from "firebase-functions-test"
// import * as index from "../functions/src/index"
// import * as Stripe from 'stripe'
// import { Interval, Currency } from '@1amageek/tradestore'
// import config from "./config"

// const Test = functions({
// 	databaseURL: 'http://localhost:8080',
// 	storageBucket: 'my-project.appspot.com',
// 	projectId: 'my-project',
//   },
//   "./secret.json")

// ballcap.initialize(admin.firestore())
// import { User } from '../functions/src/models/User'
// import { Product } from '../functions/src/models/Product'
// // import { SKU } from '../functions/src/models/SKU'
// import { Plan } from '../functions/src/models/Plan'
// import { Account } from '../functions/src/models/Account'

// // import { Order } from '../functions/src/models/Order'
// // import { OrderItem } from '../functions/src/models/OrderItem'
// // import { Subscription } from '../functions/src/models/Subscription'
// // import { SubscriptionItem } from '../functions/src/models/SubscriptionItem'
// // import { Stock } from '../functions/src/models/Stock'
// // import { Payout } from '../functions/src/models/Payout'
// // import { BalanceTransaction } from '../functions/src/models/BalanceTransaction'
// // import { TradeTransaction } from '../functions/src/models/TradeTransaction'


// Test.mockConfig(config);
// // const createAccount = Test.wrap(index.createAccount)
// const subscribe = Test.wrap(index.subscribe)

// describe("API Tests", () => {

// 	// test("CollectionReference", async () => {
// 	// 	const a = await createAccount({
// 	// 		country: "JP",
// 	// 	}, {
// 	// 		auth: {
// 	// 			uid: "test-user"
// 	// 		}
// 	// 	})
// 	// 	console.log(a)
// 	// }, 10000)

// 	describe("Subscribe", () => {
// 		const stripe = new Stripe(config.stripe.api_key)
// 		const user: User = new User("test-user")
// 		const account: Account = new Account(user.id)
// 		account.stripeID = config.stripe.customer_id
// 		const product: Product = new Product()
// 		const plan0: Plan = new Plan(product.plans.collectionReference.doc())
// 		plan0.amount = 1000
// 		plan0.interval = Interval.month
// 		plan0.intervalCount = 1
// 		plan0.productReference = product.documentReference
// 		const plan1: Plan = new Plan(product.plans.collectionReference.doc())
// 		plan1.amount = 1500
// 		plan1.interval = Interval.month
// 		plan1.intervalCount = 1
// 		plan1.productReference = product.documentReference

// 		beforeAll(async () => {
// 			const productCreateOptions: Stripe.products.IProductCreationOptions = {
// 				id: product.id,
// 				name: product.id,
// 				type: "service"
// 			}
// 			product.metadata = await stripe.products.create(productCreateOptions)
// 			const plan0CreateOptions: Stripe.plans.IPlanCreationOptions = {
// 				id: plan0.id,
// 				amount: plan0.amount,
// 				currency: Currency.JPY,
// 				interval: plan0.interval,
// 				interval_count: plan0.intervalCount,
// 				product: product.id,
// 			}
// 			plan0.metadata = await stripe.plans.create(plan0CreateOptions)
// 			const plan1CreateOptions: Stripe.plans.IPlanCreationOptions = {
// 				id: plan1.id,
// 				amount: plan1.amount,
// 				currency: Currency.JPY,
// 				interval: plan1.interval,
// 				interval_count: plan1.intervalCount,
// 				product: product.id,
// 			}
// 			plan0.metadata = await stripe.plans.create(plan1CreateOptions)
// 			await Promise.all([product.save(), plan0.save(), plan1.save(), user.save(), account.save()])
// 		})

// 		test("subscribe", async () => {
// 			const result = await subscribe({
// 				planReferences: [plan0.path, plan1.path]
// 			}, {
// 				auth: {
// 					uid: "test-user"
// 				}
// 			})
// 			console.log(result)
// 		}, 10000)
// 	})

// 	afterAll(() => {
// 		Test.cleanup()
// 	})
// })
