"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Stripe = require("stripe");
const config_1 = require("./config");
class StripeController {
    stripe() {
        const STRIPE_API_KEY = config_1.default.stripe.api_key;
        if (!STRIPE_API_KEY) {
            throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
        }
        const stripe = new Stripe(STRIPE_API_KEY);
        return stripe;
    }
    async authorize(currency, amount, order, options) {
        const stripe = this.stripe();
        const idempotency_key = order.id;
        const data = {
            amount: order.amount,
            currency: order.currency,
            capture: false,
            description: `Charge for user/${order.purchasedBy}`
        };
        if (options) {
            if (options.customer) {
                data.customer = options.customer;
            }
            if (options.source) {
                data.source = options.source;
            }
        }
        try {
            const charge = await stripe.charges.create(data, {
                idempotency_key: idempotency_key
            });
            return charge;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async authorizeCancel(currency, amount, order, options) {
        throw new Error("Method not implemented.");
    }
    async charge(currency, amount, order, options) {
        const stripe = this.stripe();
        const idempotency_key = order.id;
        const data = {
            amount: order.amount,
            currency: order.currency,
            description: `Charge for user/${order.purchasedBy}`
        };
        if (options) {
            if (options.customer) {
                data.customer = options.customer;
            }
            if (options.source) {
                data.source = options.source;
            }
        }
        try {
            const charge = await stripe.charges.create(data, {
                idempotency_key: idempotency_key
            });
            return charge;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async subscribe(subscription, options) {
        if (!options.customer) {
            throw new Error("[StripeController] CustomerID is required for subscription.");
        }
        const stripe = this.stripe();
        const customer = options.customer;
        const data = {
            customer: customer,
            trial_from_plan: true,
            metadata: options.metadata
        };
        data.items = subscription.items.map(item => {
            return {
                plan: item.planReference.id,
                quantity: item.quantity
            };
        });
        if (options.metadata) {
            data.metadata = options.metadata;
        }
        return await stripe.subscriptions.create(data);
    }
    async refund(currency, amount, order, options, reason) {
        const stripe = this.stripe();
        const transactionResults = order.transactionResults;
        const transactionResult = transactionResults[transactionResults.length - 1];
        const stripeCharge = transactionResult["stripe"];
        const charegeID = stripeCharge.id;
        const idempotency_key = `refund:${order.id}`;
        const data = {};
        data.amount = amount;
        if (reason) {
            data.reason = reason;
        }
        try {
            return await stripe.charges.refund(charegeID, data, {
                idempotency_key: idempotency_key
            });
        }
        catch (error) {
            throw error;
        }
    }
    async partRefund(currency, amount, order, orderItem, options, reason) {
        const stripe = this.stripe();
        const transactionResults = order.transactionResults;
        const transactionResult = transactionResults[transactionResults.length - 1];
        const stripeCharge = transactionResult["stripe"];
        const charegeID = stripeCharge.id;
        const idempotency_key = `refund:${orderItem}`;
        const data = {};
        data.amount = amount;
        if (reason) {
            data.reason = reason;
        }
        try {
            return await stripe.charges.refund(charegeID, data, {
                idempotency_key: idempotency_key
            });
        }
        catch (error) {
            throw error;
        }
    }
    async transfer(currency, amount, order, toAccount, options) {
        const stripe = this.stripe();
        const idempotency_key = order.id;
        const destination = toAccount.accountInformation['stripe']['id'];
        const data = {
            amount: order.amount,
            currency: order.currency,
            transfer_group: order.id,
            destination: destination
        };
        try {
            const transfer = await stripe.transfers.create(data, {
                idempotency_key: idempotency_key
            });
            return transfer;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async transferCancel(currency, amount, order, options, reason) {
        throw new Error("Method not implemented.");
    }
    async payout(currency, amount, accountID, options) {
        throw new Error("Method not implemented.");
    }
    async payoutCancel(currency, amount, accountID, options) {
        throw new Error("Method not implemented.");
    }
}
exports.StripeController = StripeController;
//# sourceMappingURL=StripeController.js.map