"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Stripe = require("stripe");
const config_1 = require("../config");
exports.onCreate = functions.auth.user().onCreate(async (user) => {
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = user.uid;
    user.metadata;
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
//# sourceMappingURL=index.js.map