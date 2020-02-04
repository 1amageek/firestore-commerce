"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Stripe = require("stripe");
const config_1 = require("../../config");
exports.create = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new Stripe(STRIPE_API_KEY);
    try {
        const result = await stripe.paymentIntents.create(data);
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
    const stripe = new Stripe(STRIPE_API_KEY);
    const paymentIntentID = data["paymentIntentID"];
    if (!paymentIntentID) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentIntentID in data.');
    }
    try {
        const result = await stripe.paymentIntents.retrieve(paymentIntentID);
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
    const stripe = new Stripe(STRIPE_API_KEY);
    const paymentIntentID = data["paymentIntentID"];
    if (!paymentIntentID) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentIntentID in data.');
    }
    const options = data["options"];
    if (!options) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires options in data.');
    }
    try {
        const result = await stripe.paymentIntents.update(paymentIntentID, options);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
exports.confirm = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new Stripe(STRIPE_API_KEY);
    const paymentIntentID = data["paymentIntentID"];
    if (!paymentIntentID) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentIntentID in data.');
    }
    const options = data["options"];
    if (!options) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires options in data.');
    }
    try {
        const result = await stripe.paymentIntents.confirm(paymentIntentID, options);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
exports.capture = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new Stripe(STRIPE_API_KEY);
    const paymentIntentID = data["paymentIntentID"];
    if (!paymentIntentID) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentIntentID in data.');
    }
    try {
        const result = await stripe.paymentIntents.capture(paymentIntentID);
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
    const stripe = new Stripe(STRIPE_API_KEY);
    const paymentIntentID = data["paymentIntentID"];
    if (!paymentIntentID) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires paymentIntentID in data.');
    }
    try {
        const result = await stripe.paymentIntents.cancel(paymentIntentID);
        return result;
    }
    catch (error) {
        console.error(error);
    }
    return;
});
//# sourceMappingURL=index.js.map