import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as Stripe from 'stripe'
import config from '../config'

export const onCreate = functions.auth.user().onCreate(async (user) => {
	const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
	if (!STRIPE_API_KEY) {
		throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
	}
	const uid: string = user.uid
	user.metadata
	const stripe = new Stripe(STRIPE_API_KEY)
	try {
		const customer = await stripe.customers.create({
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
})
