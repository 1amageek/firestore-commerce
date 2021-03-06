"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const stripe_1 = require("stripe");
const helper_1 = require("../../helper");
const helper_2 = require("../helper");
const config_1 = require("../../config");
const Product_1 = require("../../models/Product");
const Plan = require("./Plan");
const SKU = require("./SKU");
exports.plan = { ...Plan };
exports.sku = { ...SKU };
exports.onCreate = functions.firestore
    .document('/commerce/{version}/products/{productID}')
    .onCreate(async (snapshot, context) => {
    console.info(context);
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const product = Product_1.Product.fromSnapshot(snapshot);
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
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
        if (error.raw) {
            if (error.raw.code === helper_2.ErrorCode.resource_missing) {
                return;
            }
        }
        console.error(error);
        product.isAvailable = false;
        await product.update();
    }
});
exports.onUpdate = functions.firestore
    .document('/commerce/{version}/products/{productID}')
    .onUpdate(async (snapshot, context) => {
    console.info(context);
    const product = Product_1.Product.fromSnapshot(snapshot.after);
    if (!product.isAvailable) {
        return;
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new stripe_1.default(STRIPE_API_KEY, { apiVersion: '2019-12-03' });
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
        if (error.raw) {
            if (error.raw.code === helper_2.ErrorCode.resource_missing) {
                return;
            }
        }
        console.error(error);
        product.isAvailable = false;
        await product.update();
    }
});
//# sourceMappingURL=index.js.map