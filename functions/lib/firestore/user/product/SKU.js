"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Stripe = require("stripe");
const helper_1 = require("../../../helper");
const config_1 = require("../../../config");
const SKU_1 = require("../../../models/SKU");
exports.onCreate = functions.firestore
    .document('/commerce/{version}/users/{userID}/products/{productID}/SKUs/{skuID}')
    .onCreate(async (snapshot, context) => {
    console.info(context);
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const sku = SKU_1.SKU.fromSnapshot(snapshot);
    const stripe = new Stripe(STRIPE_API_KEY);
    const data = {
        id: sku.id,
        product: sku.parent.parent.id,
        inventory: sku.inventory,
        currency: sku.currency,
        price: sku.amount,
        active: sku.isAvailable,
        metadata: {
            sku_path: sku.path,
            product_path: sku.parent.parent.path
        }
    };
    try {
        await stripe.skus.create(helper_1.nullFilter(data));
    }
    catch (error) {
        console.error(error);
        sku.isAvailable = false;
        await sku.update();
    }
});
exports.onUpdate = functions.firestore
    .document('/commerce/{version}/users/{userID}/products/{productID}/SKUs/{skuID}')
    .onUpdate(async (snapshot, context) => {
    console.info(context);
    const sku = SKU_1.SKU.fromSnapshot(snapshot.after);
    if (!sku.isAvailable) {
        return;
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new Stripe(STRIPE_API_KEY);
    const data = {
        inventory: sku.inventory,
        currency: sku.currency,
        price: sku.amount,
        active: sku.isAvailable,
        metadata: {
            sku_path: sku.path,
            product_path: sku.parent.parent.path
        }
    };
    try {
        await stripe.skus.update(sku.id, helper_1.nullFilter(data));
    }
    catch (error) {
        console.error(error);
        sku.isAvailable = false;
        await sku.update();
    }
});
//# sourceMappingURL=SKU.js.map