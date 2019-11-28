import * as functions from 'firebase-functions'
import * as Stripe from 'stripe'
import { nullFilter } from './helper'
import config from '../config'
import { firestore } from '@1amageek/ballcap-admin'
import { Product } from '../models/Product'


export const onCreate = functions.firestore
	.document('/commerce/{version}/users/{userID}/products/{productID}')
	.onCreate(async (snapshot, context) => {
		if (!context.auth) {
			throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
		}
		const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
		if (!STRIPE_API_KEY) {
			throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
		}
		const product: Product = Product.fromSnapshot(snapshot)
		const stripe = new Stripe(STRIPE_API_KEY)
		const data: Stripe.products.IProductCreationOptions = {
			id: product.id,
			type: product.type,
			name: product.name,
			caption: product.caption,
			description: product.description,
			active: product.isAvailable,
			metadata: {
				product_path: product.path
			}
		}
		try {
			await stripe.products.create(nullFilter(data))
		} catch (error) {
			console.error(error)
			await firestore.doc(product.path).set({ isAvailable: false }, { merge: true })
		}
	})

export const onUpdate = functions.firestore
	.document('/commerce/{version}/users/{userID}/products/{productID}')
	.onUpdate(async (snapshot, context) => {
		if (!context.auth) {
			throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
		}
		const product: Product = Product.fromSnapshot(snapshot.after)
		if (!product.isAvailable) {
			return
		}
		const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
		if (!STRIPE_API_KEY) {
			throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
		}
		const stripe = new Stripe(STRIPE_API_KEY)
		const data: Stripe.products.IProductUpdateOptions = {
			name: product.name,
			caption: product.caption,
			description: product.description,
			active: product.isAvailable,
			metadata: {
				product_path: product.path
			}
		}
		try {
			await stripe.products.update(product.id, nullFilter(data))
		} catch (error) {
			console.error(error)
			await firestore.doc(product.path).set({ isAvailable: false }, { merge: true })
		}
	})
