"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const Stripe = require("stripe");
const ballcap_admin_1 = require("@1amageek/ballcap-admin");
const tradestore_1 = require("@1amageek/tradestore");
const config_1 = require("./config");
const TradeController_1 = require("./TradeController");
const StripeController_1 = require("./StripeController");
if (firebase.apps.length === 0) {
    firebase.initializeApp();
    ballcap_admin_1.initialize(firebase);
}
const Account_1 = require("./models/Account");
const User_1 = require("./models/User");
const SKU_1 = require("./models/SKU");
const Plan_1 = require("./models/Plan");
const Order_1 = require("./models/Order");
const Subscription_1 = require("./models/Subscription");
const SubscriptionItem_1 = require("./models/SubscriptionItem");
const Stock_1 = require("./models/Stock");
const BalanceTransaction_1 = require("./models/BalanceTransaction");
const TradeTransaction_1 = require("./models/TradeTransaction");
exports.createAccount = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = context.auth.uid;
    const stripe = new Stripe(STRIPE_API_KEY);
    const cuntory = data['cuntory'];
    try {
        const customer = await stripe.customers.create({ description: uid });
        const account = new Account_1.Account(uid);
        account.country = cuntory;
        account.stripeID = customer.id;
        const user = new User_1.User(uid);
        user.country = cuntory;
        const batch = new ballcap_admin_1.Batch();
        batch.save(account);
        batch.save(user);
        await batch.commit();
    }
    catch (error) {
        console.error(error);
        throw new functions.https.HttpsError('internal', error.stack);
    }
});
exports.checkout = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = context.auth.uid;
    const orderReferencePath = data['orderReference'];
    const source = data['source'];
    const orderReference = firebase.firestore().doc(orderReferencePath);
    const account = await new Account_1.Account(uid).fetch();
    const customer = account.stripeID;
    if (!customer) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires customer.');
    }
    try {
        const manager = new tradestore_1.Manager(Stock_1.Stock.self(), SKU_1.SKU.self(), Order_1.Order.self(), TradeTransaction_1.TradeTransaction.self(), BalanceTransaction_1.BalanceTransaction.self(), User_1.User.self(), Account_1.Account.self());
        manager.delegate = new StripeController_1.StripeController(STRIPE_API_KEY);
        manager.tradeDelegate = new TradeController_1.TradeController();
        const paymentOptions = {
            vendorType: 'stripe',
            refundFeeRate: 0
        };
        if (source) {
            paymentOptions['source'] = source;
        }
        if (customer) {
            paymentOptions['customer'] = customer;
        }
        let paymentResult;
        try {
            // tslint:disable-next-line:no-shadowed-variable
            const result = await manager.runTransaction(orderReference, paymentOptions, async (order, option, transaction) => {
                if (order.paymentStatus !== tradestore_1.OrderPaymentStatus.none) {
                    return;
                }
                const stockTransactions = await manager.stockManager.trade(order, transaction);
                const tradeTransactions = (await Promise.all(stockTransactions.map(stockTransaction => stockTransaction.commit()))).map(transactions => {
                    return transactions.map(tradeTransaction => {
                        let productReference = null;
                        let stockReference = null;
                        if (tradeTransaction.productReference) {
                            productReference = tradeTransaction.productReference.path;
                        }
                        if (tradeTransaction.stockReference) {
                            stockReference = tradeTransaction.stockReference.path;
                        }
                        return {
                            type: tradeTransaction.type,
                            selledBy: tradeTransaction.selledBy,
                            purchasedBy: tradeTransaction.purchasedBy,
                            orderReference: tradeTransaction.orderReference.path,
                            productReference: productReference,
                            skuRefernece: tradeTransaction.skuRefernece.path,
                            itemReference: tradeTransaction.itemReference.path,
                            stockReference: stockReference
                        };
                    });
                });
                order.paymentStatus = tradestore_1.OrderPaymentStatus.paid;
                if (order.amount === 0) {
                    manager.orderManager.update(order, {}, {}, transaction);
                }
                else {
                    paymentResult = await manager.delegate.charge(order.currency, order.amount, order, option);
                    manager.balanceManager.charge(order.purchasedBy, order.documentReference, order.currency, order.amount, { [option.vendorType]: paymentResult }, transaction);
                    manager.orderManager.update(order, {}, { [option.vendorType]: paymentResult }, transaction);
                }
                return tradeTransactions;
            });
            return { tradeTransactions: result };
        }
        catch (error) {
            console.error(error);
            if (paymentResult) {
                // 返金処理
            }
            throw new functions.https.HttpsError('internal', error.message, { code: error.code });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.subscribe = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = context.auth.uid;
    const planReferencePaths = data['planReferences'];
    const account = await new Account_1.Account(uid).fetch();
    const customer = account.stripeID;
    if (!customer) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires customer.');
    }
    const promise = planReferencePaths.map(path => {
        return new Plan_1.Plan(firebase.firestore().doc(path)).fetch();
    });
    const plans = await Promise.all(promise);
    const subscriptionOptions = {
        vendorType: "stripe",
        customer: customer
    };
    const controller = new tradestore_1.SubscriptionController(Subscription_1.Subscription.self(), SubscriptionItem_1.SubscriptionItem.model());
    controller.delegate = new StripeController_1.StripeController(STRIPE_API_KEY);
    const subscriber = new User_1.User(uid);
    try {
        const subscription = await controller.subscribe(subscriber, plans, subscriptionOptions, async (subscription, option, transaction) => {
            const result = await controller.delegate.subscribe(subscription, option);
            subscription.result = result;
            return subscription;
        });
        return subscription.data();
    }
    catch (error) {
        throw error;
    }
});
//# sourceMappingURL=index.js.map