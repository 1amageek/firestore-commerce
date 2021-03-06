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
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
    try {
        const result = await stripe.paymentMethods.create(data);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
exports.retrieve = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
    const paymentMethodId = data["paymentMethodID"];
    if (!paymentMethodId) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentMethodID in data.');
    }
    try {
        const result = await stripe.paymentMethods.retrieve(paymentMethodId);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
exports.list = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = context.auth.uid;
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
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
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
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
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
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