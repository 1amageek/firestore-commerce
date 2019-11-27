"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Stripe = require("stripe");
const helper_1 = require("./helper");
const config_1 = require("../config");
const Plan_1 = require("../models/Plan");
exports.onCreate = functions.firestore
    .document('/commerce/{version}/users/{userID}/products/{productID}/plans/{planID}')
    .onCreate(async (snapshot, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const plan = Plan_1.Plan.fromSnapshot(snapshot);
    const stripe = new Stripe(STRIPE_API_KEY);
    const data = {
        id: plan.path,
        product: plan.parent.parent.path,
        interval: plan.interval,
        interval_count: plan.intervalCount,
        currency: plan.currency,
        amount: plan.amount,
        active: plan.isAvailable
    };
    await stripe.plans.create(helper_1.nullFilter(data));
});
exports.onUpdate = functions.firestore
    .document('/commerce/{version}/users/{userID}/products/{productID}/plans/{planID}')
    .onUpdate(async (snapshot, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const plan = Plan_1.Plan.fromSnapshot(snapshot.after);
    const stripe = new Stripe(STRIPE_API_KEY);
    const data = {
        product: plan.parent.parent.path,
    };
    await stripe.plans.update(plan.path, helper_1.nullFilter(data));
});
//# sourceMappingURL=Plan.js.map