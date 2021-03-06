"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const stripe_1 = require("stripe");
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
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
    try {
        const result = await stripe.customers.create({
            ...data,
            description: uid
        });
        return result;
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
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
    try {
        const customerID = await helper_1.getCustomerID(uid);
        const result = await stripe.customers.update(customerID, data);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
exports.retrieve = functions.https.onCall(async (_, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = context.auth.uid;
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
    try {
        const customerID = await helper_1.getCustomerID(uid);
        const result = await stripe.customers.retrieve(customerID);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
//# sourceMappingURL=index.js.map