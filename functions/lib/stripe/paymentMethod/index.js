"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Stripe = require("stripe");
const config_1 = require("../../config");
const helper_1 = require("../helper");
exports.list = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = context.auth.uid;
    const stripe = new Stripe(STRIPE_API_KEY);
    const type = data["type"] || "card";
    try {
        const customerID = await helper_1.getCustomerID(uid);
        const result = await stripe.paymentMethods.list({
            customer: customerID,
            type: type
        });
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
exports.attach = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = context.auth.uid;
    const stripe = new Stripe(STRIPE_API_KEY);
    const paymentMethodId = data["paymentMethodID"];
    if (!paymentMethodId) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentMethodID in data.');
    }
    try {
        const customerID = await helper_1.getCustomerID(uid);
        const result = await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerID
        });
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
exports.detach = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new Stripe(STRIPE_API_KEY);
    const paymentMethodId = data["paymentMethodID"];
    if (!paymentMethodId) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentMethodID in data.');
    }
    try {
        return stripe.paymentMethods.detach(paymentMethodId);
    }
    catch (error) {
        console.error(error);
    }
    return;
});
//# sourceMappingURL=index.js.map