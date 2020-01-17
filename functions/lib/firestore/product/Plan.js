"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Stripe = require("stripe");
const helper_1 = require("../../helper");
const helper_2 = require("../helper");
const config_1 = require("../../config");
const Plan_1 = require("../../models/Plan");
exports.onCreate = functions.firestore
    .document('/commerce/{version}/products/{productID}/plans/{planID}')
    .onCreate(async (snapshot, context) => {
    var _a;
    console.info(context);
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const plan = Plan_1.Plan.fromSnapshot(snapshot);
    const stripe = new Stripe(STRIPE_API_KEY);
    const data = {
        id: plan.id,
        product: plan.parent.parent.id,
        nickname: plan.name,
        interval: plan.interval,
        interval_count: plan.intervalCount,
        currency: plan.currency,
        trial_period_days: (_a = plan.trialPeriodDays) === null || _a === void 0 ? void 0 : _a.toDate().valueOf(),
        amount: plan.amount,
        active: plan.isAvailable,
        metadata: {
            plan_path: plan.path,
            product_path: plan.parent.parent.path
        }
    };
    try {
        await stripe.plans.create(helper_1.nullFilter(data));
    }
    catch (error) {
        if (error.row) {
            if (error.row.code === helper_2.ErrorCode.resource_missing) {
                return;
            }
        }
        console.error(error);
        plan.isAvailable = false;
        await plan.update();
    }
});
exports.onUpdate = functions.firestore
    .document('/commerce/{version}/products/{productID}/plans/{planID}')
    .onUpdate(async (snapshot, context) => {
    console.info(context);
    const plan = Plan_1.Plan.fromSnapshot(snapshot.after);
    if (!plan.isAvailable) {
        return;
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const stripe = new Stripe(STRIPE_API_KEY);
    const data = {
        product: plan.parent.parent.id,
        metadata: {
            plan_path: plan.path,
            product_path: plan.parent.parent.path
        }
    };
    try {
        await stripe.plans.update(plan.id, helper_1.nullFilter(data));
    }
    catch (error) {
        console.error(error);
        plan.isAvailable = false;
        await plan.update();
    }
});
//# sourceMappingURL=Plan.js.map