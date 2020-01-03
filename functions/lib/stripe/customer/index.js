"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Stripe = require("stripe");
const config_1 = require("../../config");
const helper_1 = require("../helper");
exports.create = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = context.auth.uid;
    const stripe = new Stripe(STRIPE_API_KEY);
    try {
        const customer = await stripe.customers.create({
            ...data,
            description: uid
        });
        return await admin.auth().setCustomUserClaims(uid, {
            stripe: {
                customerID: customer.id
            }
        });
    }
    catch (error) {
        console.error(error);
    }
    return;
});
exports.update = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = context.auth.uid;
    const stripe = new Stripe(STRIPE_API_KEY);
    try {
        const customerID = await helper_1.getCustomerID(uid);
        return await stripe.customers.update(customerID, data);
    }
    catch (error) {
        console.error(error);
    }
    return;
});
//# sourceMappingURL=index.js.map