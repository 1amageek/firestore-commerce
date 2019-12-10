import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as Stripe from 'stripe'
import { initialize } from '@1amageek/ballcap-admin'
import { Manager, PaymentOptions, OrderPaymentStatus, TradestoreError, SubscriptionController, SubscriptionOptions } from '@1amageek/tradestore'
import config from './config'

if (admin.apps.length === 0) {
	const firebase = admin.initializeApp()
	initialize(firebase.firestore())
}

import { TradeController } from './TradeController'
import { StripeController } from './StripeController'
import { Account } from './models/Account'
import { User } from './models/User'
import { Product } from './models/Product'
import { SKU } from './models/SKU'
import { Plan } from './models/Plan'
import { Order } from './models/Order'
import { OrderItem } from './models/OrderItem'
import { Subscription } from './models/Subscription'
import { SubscriptionItem } from './models/SubscriptionItem'
import { Stock } from './models/Stock'
import { Payout } from './models/Payout'
import { BalanceTransaction } from './models/BalanceTransaction'
import { TradeTransaction } from './models/TradeTransaction'

import * as authTrigger from './auth'
import * as FirestoreTrigger from './firestore'


// Commerce documents.
export { Account, User, Product, SKU, Plan, Order, OrderItem, Subscription, SubscriptionItem, Stock, PaymentOptions, BalanceTransaction, TradeTransaction }

// Authentication triggerd functions.
export const auth = { ...authTrigger }

// Cloud Firestore triggered functions.
export const firestore = { ...FirestoreTrigger }

export const checkout = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const uid: string = context.auth.uid
	const userRecord = await admin.auth().getUser(uid)
	const customClaims = userRecord.customClaims
	if (!customClaims) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	const customer = (customClaims as any).stripe?.customerID
	if (!customer) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	const orderReferencePath = data['orderReference']
	const source: string = data['source']
	const orderReference: admin.firestore.DocumentReference = admin.firestore().doc(orderReferencePath)
	try {
		const manager: Manager<Stock, SKU, OrderItem, Order, TradeTransaction, BalanceTransaction, Payout, User, Account> = new Manager(Stock.self(), SKU.self(), Order.self(), TradeTransaction.self(), BalanceTransaction.self(), User.self(), Account.self())
		manager.delegate = new StripeController(STRIPE_API_KEY)
		manager.tradeDelegate = new TradeController()
		const paymentOptions: PaymentOptions = {
			vendorType: 'stripe',
			refundFeeRate: 0
		}
		if (source) {
			paymentOptions['source'] = source
		}
		if (customer) {
			paymentOptions['customer'] = customer
		}
		let paymentResult: any | undefined
		try {
			// tslint:disable-next-line:no-shadowed-variable
			const result = await manager.runTransaction(orderReference, paymentOptions, async (order, option, transaction) => {
				if (order.paymentStatus !== OrderPaymentStatus.none) {
					return
				}
				const stockTransactions = await manager.stockManager.trade(order, transaction)
				const tradeTransactions = (await Promise.all(stockTransactions.map(stockTransaction => stockTransaction.commit()))).map(transactions => {
					return transactions.map(tradeTransaction => {
						let productReference = null
						let stockReference = null
						if (tradeTransaction.productReference) {
							productReference = tradeTransaction.productReference.path
						}
						if (tradeTransaction.stockReference) {
							stockReference = tradeTransaction.stockReference.path
						}
						return {
							type: tradeTransaction.type,
							selledBy: tradeTransaction.selledBy,
							purchasedBy: tradeTransaction.purchasedBy,
							orderReference: tradeTransaction.orderReference.path,
							productReference: productReference,
							skuRefernece: tradeTransaction.skuRefernece.path,
							itemReference: tradeTransaction.itemReference.path,
							stockReference: stockReference
						}
					})
				})
				order.paymentStatus = OrderPaymentStatus.paid
				if (order.amount === 0) {
					manager.orderManager.update(order, {}, {}, transaction)
				} else {
					paymentResult = await manager.delegate!.charge(order.currency, order.amount, order, option)
					manager.balanceManager.charge(order.purchasedBy,
						order.documentReference,
						order.currency,
						order.amount,
						{ [option.vendorType]: paymentResult },
						transaction)
					manager.orderManager.update(order, {},
						{ [option.vendorType]: paymentResult },
						transaction)
				}
				return tradeTransactions
			})
			return { tradeTransactions: result }
		} catch (error) {
			console.error(error)
			if (paymentResult) {
				// 返金処理
			}
			throw new functions.https.HttpsError('internal', (error as TradestoreError).message, { code: (error as TradestoreError).code })
		}
	} catch (error) {
		throw error
	}
})

export const subscribe = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const uid: string = context.auth.uid
	const userRecord = await admin.auth().getUser(uid)
	const customClaims = userRecord.customClaims
	if (!customClaims) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	const customer = (customClaims as any).stripe?.customerID
	if (!customer) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	const planReferencePaths: string[] = data['planReferences']
	const promise: Promise<Plan>[] = planReferencePaths.map(path => {
		return new Plan(admin.firestore().doc(path)).fetch()
	})
	const plans: Plan[] = await Promise.all(promise)
	const subscriptionOptions: SubscriptionOptions = {
		vendorType: "stripe",
		customer: customer
	}
	const controller: SubscriptionController<Plan, SubscriptionItem, Subscription, User> = new SubscriptionController(Subscription.self(), SubscriptionItem.model())
	controller.delegate = new StripeController(STRIPE_API_KEY)
	const subscriber: User = new User(uid)
	try {
		const subscription = await controller.subscribe(subscriber, plans, subscriptionOptions, async (subscription, option, transaction) => {
			const result: Stripe.subscriptions.ISubscription = await controller.delegate!.subscribe(subscription, option)
			subscription.result = result
			return subscription
		})
		return subscription.data()
	} catch (error) {
		throw error
	}
})
