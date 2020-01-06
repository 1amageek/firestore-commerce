import * as functions from 'firebase-functions'
import * as Stripe from 'stripe'
import config from '../../config'
import { getCustomerID } from '../helper'

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
		const result = await stripe.customers.create({
			...data,
			description: uid
		})
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
	const uid: string = context.auth.uid
	const stripe = new Stripe(STRIPE_API_KEY)
	try {
		const customerID = await getCustomerID(uid)
		const result = await stripe.customers.update(customerID, data)
		return result
	} catch (error) {
		console.error(error)
	}
	return
})

export const retrieve = functions.https.onCall(async (_, context) => {
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
		const result = await stripe.customers.retrieve(customerID)
		return result
	} catch (error) {
		console.error(error)
	}
	return
})
