"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const stripe_1 = require("stripe");
const config_1 = require("../../config");
exports.create = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
    const params = data['params'];
    const options = data['options'];
    try {
        const result = await stripe.subscriptionSchedules.create(params, options);
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
    const id = data['id'];
    const params = data['params'];
    const options = data['options'];
    if (!id) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires `id` in data.');
    }
    try {
        const result = await stripe.subscriptionSchedules.retrieve(id, params, options);
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
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
    const id = data['id'];
    const params = data['params'];
    const options = data['options'];
    if (!id) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires `id` in data.');
    }
    if (!params) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires params in data.');
    }
    try {
        const result = await stripe.subscriptionSchedules.update(id, params, options);
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
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
    const params = data['params'];
    const options = data['options'];
    if (!options) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires options in data.');
    }
    try {
        const result = await stripe.subscriptionSchedules.list(params, options);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
exports.release = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
    const id = data['id'];
    const params = data['params'];
    const options = data['options'];
    if (!id) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires `id` in data.');
    }
    try {
        const result = await stripe.subscriptionSchedules.release(id, params, options);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
exports.cancel = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
    const id = data['id'];
    const params = data['params'];
    const options = data['options'];
    if (!id) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires `id` in data.');
    }
    try {
        const result = await stripe.subscriptionSchedules.cancel(id, params, options);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
//# sourceMappingURL=index.js.map