"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Stripe = require("stripe");
const helper_1 = require("./helper");
const config_1 = require("../config");
const Product_1 = require("../models/Product");
exports.onCreate = functions.firestore
    .document('/commerce/{version}/users/{userID}/products/{productID}')
    .onCreate(async (snapshot, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const product = Product_1.Product.fromSnapshot(snapshot);
    const stripe = new Stripe(STRIPE_API_KEY);
    const data = {
        id: product.path,
        type: product.type,
        name: product.name,
        caption: product.caption,
        description: product.description,
        active: product.isAvailable,
        metadata: {
            product_path: product.path
        }
    };
    await stripe.products.create(helper_1.nullFilter(data));
});
exports.onUpdate = functions.firestore
    .document('/commerce/{version}/users/{userID}/products/{productID}')
    .onUpdate(async (snapshot, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const product = Product_1.Product.fromSnapshot(snapshot.after);
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
    await stripe.products.update(product.id, helper_1.nullFilter(data));
});
//# sourceMappingURL=Product.js.map