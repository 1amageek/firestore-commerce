"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Stripe = require("stripe");
const config_1 = require("../config");
exports.setCustomer = functions.https.onCall(async (data, context) => {
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
});
exports.onCreate = functions.auth.user().onCreate(async (user) => {
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = user.uid;
    const stripe = new Stripe(STRIPE_API_KEY);
    try {
        const customer = await stripe.customers.create({
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
});
exports.setPaymentMethod = functions.https.onCall(async (data, context) => {
    var _a;
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    console.info(data, context);
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const paymentMethod = data['paymentMethod'];
    if (!paymentMethod) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires `peymentMethod`');
    }
    const stripe = new Stripe(STRIPE_API_KEY);
    const uid = context.auth.uid;
    const userRecord = await admin.auth().getUser(uid);
    const customClaims = userRecord.customClaims;
    if (!customClaims) {
        throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID');
    }
    const customerID = (_a = customClaims.stripe) === null || _a === void 0 ? void 0 : _a.customerID;
    if (!customerID) {
        throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID');
    }
    try {
        return await stripe.paymentMethods.attach(paymentMethod, {
            customer: customerID
        });
    }
    catch (error) {
        console.error(error);
    }
    return;
});
//# sourceMappingURL=index.js.map