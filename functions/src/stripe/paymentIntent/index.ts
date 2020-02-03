import * as functions from 'firebase-functions'
import * as Stripe from 'stripe'
import config from '../../config'

export const create = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const stripe = new Stripe(STRIPE_API_KEY)
	try {
		const result = await stripe.paymentIntents.create(data)
		return result
	} catch (error) {
		console.error(error)
	}
	return
})

export const retrieve = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const stripe = new Stripe(STRIPE_API_KEY)
	const paymentIntentID = data["paymentIntentID"]
	if (!paymentIntentID) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentIntentID in data.')
	}
	try {
		const result = await stripe.paymentIntents.retrieve(paymentIntentID)
		return result
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
	const stripe = new Stripe(STRIPE_API_KEY)
	const paymentIntentID = data["paymentIntentID"]
	if (!paymentIntentID) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentIntentID in data.')
	}
	const options = data["options"]
	if (!options) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires options in data.')
	}
	try {
		const result = await stripe.paymentIntents.update(paymentIntentID, options)
		return result
	} catch (error) {
		console.error(error)
	}
	return
})

export const confirm = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const stripe = new Stripe(STRIPE_API_KEY)
	const paymentIntentID = data["paymentIntentID"]
	if (!paymentIntentID) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentIntentID in data.')
	}
	const options = data["options"]
	if (!options) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires options in data.')
	}
	try {
		const result = await stripe.paymentIntents.confirm(paymentIntentID, options)
		return result
	} catch (error) {
		console.error(error)
	}
	return
})


export const capture = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const stripe = new Stripe(STRIPE_API_KEY)
	const paymentIntentID = data["paymentIntentID"]
	if (!paymentIntentID) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentIntentID in data.')
	}
	try {
		const result = await stripe.paymentIntents.capture(paymentIntentID)
		return result
	} catch (error) {
		console.error(error)
	}
	return
})

export const cancel = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
	}
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const stripe = new Stripe(STRIPE_API_KEY)
	const paymentIntentID = data["paymentIntentID"]
	if (!paymentIntentID) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentIntentID in data.')
	}
	try {
		const result = await stripe.paymentIntents.cancel(paymentIntentID)
		return result
	} catch (error) {
		console.error(error)
	}
	return
})
