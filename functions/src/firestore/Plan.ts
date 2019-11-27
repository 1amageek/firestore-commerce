import * as functions from 'firebase-functions'
import * as Stripe from 'stripe'
import { nullFilter } from './helper'
import config from '../config'
import { Plan } from '../models/Plan'

export const onCreate = functions.firestore
    .document('/commerce/{version}/users/{userID}/products/{productID}/plans/{planID}')
    .onCreate(async (snapshot, context) => {
        if (!context.auth) {
            throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
        }
        const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
        if (!STRIPE_API_KEY) {
            throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
        }
        const plan: Plan = Plan.fromSnapshot(snapshot)
        const stripe = new Stripe(STRIPE_API_KEY)
        const data: Stripe.plans.IPlanCreationOptions = {
            id: plan.path,
            product: plan.parent.parent!.path,
            interval: plan.interval,
            interval_count: plan.intervalCount,
            currency: plan.currency,
            amount: plan.amount,
            active: plan.isAvailable
        }
        await stripe.plans.create(nullFilter(data))
    })

export const onUpdate = functions.firestore
    .document('/commerce/{version}/users/{userID}/products/{productID}/plans/{planID}')
    .onUpdate(async (snapshot, context) => {
        if (!context.auth) {
            throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
        }
        const STRIPE_API_KEY = config.stripe.api_key || functions.config().stripe.api_key
        if (!STRIPE_API_KEY) {
            throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
        }
        const plan: Plan = Plan.fromSnapshot(snapshot.after)
        const stripe = new Stripe(STRIPE_API_KEY)
        const data: Stripe.plans.IPlanUpdateOptions = {
            product: plan.parent.parent!.path,
        }
        await stripe.plans.update(plan.path, nullFilter(data))
    })