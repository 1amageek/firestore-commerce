import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as Stripe from 'stripe'
import config from '../../config'

const getCustomerID = async (uid: string) => {
	const userRecord = await admin.auth().getUser(uid)
	const customClaims = userRecord.customClaims
	if (!customClaims) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	const customerID = (customClaims as any).stripe?.customerID
	if (!customerID) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	return customerID
}

export const create = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const uid: string = context.auth.uid
	const stripe = new Stripe(STRIPE_API_KEY)
	try {
		const customer = await stripe.customers.create({
			...data,
			description: uid
		})
		return await admin.auth().setCustomUserClaims(uid, {
			stripe: {
				customerID: customer.id
			}
		})
	} catch (error) {
		console.error(error)
	}
	return
})

export const update = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const uid: string = context.auth.uid
	const stripe = new Stripe(STRIPE_API_KEY)
	try {
		const customerID = await getCustomerID(uid)
		return await stripe.customers.update(customerID, data)
	} catch (error) {
		console.error(error)
	}
	return
})
