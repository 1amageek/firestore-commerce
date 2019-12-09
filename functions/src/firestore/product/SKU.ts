import * as functions from 'firebase-functions'
import * as Stripe from 'stripe'
import { nullFilter } from '../helper'
import config from '../../config'
import { SKU } from '../../models/SKU'

export const onCreate = functions.firestore
	.document('/commerce/{version}/products/{productID}/SKUs/{skuID}')
	.onCreate(async (snapshot, context) => {
		console.info(context)
		const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
		if (!STRIPE_API_KEY) {
			throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
		}
		const sku: SKU = SKU.fromSnapshot(snapshot)
		const stripe = new Stripe(STRIPE_API_KEY)
		const data: Stripe.skus.ISkuCreationOptions = {
			id: sku.id,
			product: sku.parent.parent!.id,
			inventory: sku.inventory,
			currency: sku.currency,
			price: sku.amount,
			active: sku.isAvailable,
			metadata: {
				sku_path: sku.path,
				product_path: sku.parent.parent!.path
			}
		}
		try {
			await stripe.skus.create(nullFilter(data))
		} catch (error) {
			console.error(error)
			sku.isAvailable = false
			await sku.update()
		}
	})

export const onUpdate = functions.firestore
	.document('/commerce/{version}/products/{productID}/SKUs/{skuID}')
	.onUpdate(async (snapshot, context) => {
		console.info(context)
		const sku: SKU = SKU.fromSnapshot(snapshot.after)
		if (!sku.isAvailable) {
			return
		}
		const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
		if (!STRIPE_API_KEY) {
			throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
		}
		const stripe = new Stripe(STRIPE_API_KEY)
		const data: Stripe.skus.ISkuUpdateOptions = {
			inventory: sku.inventory,
			currency: sku.currency,
			price: sku.amount,
			active: sku.isAvailable,
			metadata: {
				sku_path: sku.path,
				product_path: sku.parent.parent!.path
			}
		}
		try {
			await stripe.skus.update(sku.id, nullFilter(data))
		} catch (error) {
			console.error(error)
			sku.isAvailable = false
			await sku.update()
		}
	})
