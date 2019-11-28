"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Stripe = require("stripe");
const helper_1 = require("./helper");
const config_1 = require("../config");
const ballcap_admin_1 = require("@1amageek/ballcap-admin");
const Product_1 = require("../models/Product");
exports.onCreate = functions.firestore
    .document('/commerce/{version}/users/{userID}/products/{productID}')
    .onCreate(async (snapshot, context) => {
    // if (!context.auth) {
    // 	throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.')
    // }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const product = Product_1.Product.fromSnapshot(snapshot);
    const stripe = new Stripe(STRIPE_API_KEY);
    const data = {
        id: product.id,
        type: product.type,
        name: product.name,
        caption: product.caption,
        description: product.description,
        active: product.isAvailable,
        metadata: {
            product_path: product.path
        }
    };
    try {
        await stripe.products.create(helper_1.nullFilter(data));
    }
    catch (error) {
        console.error(error);
        await ballcap_admin_1.firestore.doc(product.path).set({ isAvailable: false }, { merge: true });
    }
});
exports.onUpdate = functions.firestore
    .document('/commerce/{version}/users/{userID}/products/{productID}')
    .onUpdate(async (snapshot, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const product = Product_1.Product.fromSnapshot(snapshot.after);
    if (!product.isAvailable) {
        return;
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new Stripe(STRIPE_API_KEY);
    const data = {
        name: product.name,
        caption: product.caption,
        description: product.description,
        active: product.isAvailable,
        metadata: {
            product_path: product.path
        }
    };
    try {
        await stripe.products.update(product.id, helper_1.nullFilter(data));
    }
    catch (error) {
        console.error(error);
        await ballcap_admin_1.firestore.doc(product.path).set({ isAvailable: false }, { merge: true });
    }
});
//# sourceMappingURL=Product.js.map