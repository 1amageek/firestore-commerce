import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import Stripe from 'stripe'
import config from '../config'

export const setCustomer = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const uid: string = context.auth.uid
	const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: '2019-12-03' })
	const paymentMethod = data['paymentMethod']

	try {
		let data: Stripe.CustomerCreateParams = {
			description: uid
		}
		if (paymentMethod) {
			data.payment_method = paymentMethod
			data.invoice_settings = {
				default_payment_method: paymentMethod
			}
		}
		const customer = await stripe.customers.create(data)
		return await admin.auth().setCustomUserClaims(uid, {
			stripe: {
				customerID: customer.id
			}
		})
	} catch (error) {
		console.error(error)
	}
})

export const setPaymentMethod = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	console.info(data, context)
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const paymentMethod = data['paymentMethod']
	if (!paymentMethod) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires `peymentMethod`')
	}
	const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: '2019-12-03' })
	const uid: string = context.auth.uid
	const userRecord = await admin.auth().getUser(uid)
	const customClaims = userRecord.customClaims
	if (!customClaims) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	const customerID = (customClaims as any).stripe?.customerID
	if (!customerID) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	try {
		return await stripe.paymentMethods.attach(paymentMethod, {
			customer: customerID
		})
	} catch (error) {
		console.error(error)
	}
	return
})

export const setDefaultPaymentMethod = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	console.info(data, context)
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const paymentMethod = data['paymentMethod']
	if (!paymentMethod) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires `peymentMethod`')
	}
	const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: '2019-12-03' })
	const uid: string = context.auth.uid
	const userRecord = await admin.auth().getUser(uid)
	const customClaims = userRecord.customClaims
	if (!customClaims) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	const customerID = (customClaims as any).stripe?.customerID
	if (!customerID) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	try {
		return await stripe.customers.update(customerID, {
			invoice_settings: {
				default_payment_method: paymentMethod
			}
		})
	} catch (error) {
		console.error(error)
	}
	return
})
