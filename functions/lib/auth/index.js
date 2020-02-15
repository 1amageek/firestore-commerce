"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const stripe_1 = require("stripe");
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
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
    const paymentMethod = data['paymentMethod'];
    try {
        let data = {
            description: uid
        };
        if (paymentMethod) {
            data.payment_method = paymentMethod;
            data.invoice_settings = {
                default_payment_method: paymentMethod
            };
        }
        const customer = await stripe.customers.create(data);
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
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
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
exports.setDefaultPaymentMethod = functions.https.onCall(async (data, context) => {
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
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
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
        return await stripe.customers.update(customerID, {
            invoice_settings: {
                default_payment_method: paymentMethod
            }
        });
    }
    catch (error) {
        console.error(error);
    }
    return;
});
//# sourceMappingURL=index.js.map