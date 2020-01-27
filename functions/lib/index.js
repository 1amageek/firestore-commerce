"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const helper_1 = require("./stripe/helper");
const ballcap_admin_1 = require("@1amageek/ballcap-admin");
const tradestore_1 = require("@1amageek/tradestore");
const config_1 = require("./config");
if (admin.apps.length === 0) {
    const firebase = admin.initializeApp();
    ballcap_admin_1.initialize(firebase.firestore());
}
const TradeController_1 = require("./TradeController");
const StripeController_1 = require("./StripeController");
const Account_1 = require("./models/Account");
exports.Account = Account_1.Account;
const User_1 = require("./models/User");
exports.User = User_1.User;
const Product_1 = require("./models/Product");
exports.Product = Product_1.Product;
const SKU_1 = require("./models/SKU");
exports.SKU = SKU_1.SKU;
const Plan_1 = require("./models/Plan");
exports.Plan = Plan_1.Plan;
const Order_1 = require("./models/Order");
exports.Order = Order_1.Order;
const OrderItem_1 = require("./models/OrderItem");
exports.OrderItem = OrderItem_1.OrderItem;
const Item_1 = require("./models/Item");
exports.Item = Item_1.Item;
const Subscription_1 = require("./models/Subscription");
exports.Subscription = Subscription_1.Subscription;
const SubscriptionItem_1 = require("./models/SubscriptionItem");
exports.SubscriptionItem = SubscriptionItem_1.SubscriptionItem;
const Stock_1 = require("./models/Stock");
exports.Stock = Stock_1.Stock;
const BalanceTransaction_1 = require("./models/BalanceTransaction");
exports.BalanceTransaction = BalanceTransaction_1.BalanceTransaction;
const TradeTransaction_1 = require("./models/TradeTransaction");
exports.TradeTransaction = TradeTransaction_1.TradeTransaction;
const authTrigger = require("./auth");
const FirestoreTrigger = require("./firestore");
const StripeAPI = require("./stripe");
// Authentication triggerd functions.
exports.auth = { ...authTrigger };
// Cloud Firestore triggered functions.
exports.firestore = { ...FirestoreTrigger };
// Stripe API
exports.stripe = { ...StripeAPI };
exports.checkout = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = context.auth.uid;
    const customer = await helper_1.getCustomerID(uid);
    if (!customer) {
        throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID');
    }
    const orderReferencePath = data['orderReference'];
    const source = data['source'];
    const orderReference = admin.firestore().doc(orderReferencePath);
    try {
        const manager = new tradestore_1.Manager(Stock_1.Stock.self(), SKU_1.SKU.self(), Order_1.Order.self(), TradeTransaction_1.TradeTransaction.self(), BalanceTransaction_1.BalanceTransaction.self(), User_1.User.self(), Account_1.Account.self());
        manager.delegate = new StripeController_1.StripeController(STRIPE_API_KEY);
        manager.tradeDelegate = new TradeController_1.TradeController();
        const metadata = data['metadata'] || {};
        const paymentOptions = {
            vendorType: 'stripe',
            refundFeeRate: 0,
            metadata: {
                ...metadata,
                uid: uid
            }
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
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const STRIPE_API_KEY = config_1.default.stripe.api_key || functions.config().stripe.api_key;
    if (!STRIPE_API_KEY) {
        throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.');
    }
    const uid = context.auth.uid;
    const customer = await helper_1.getCustomerID(uid);
    if (!customer) {
        throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID');
    }
    const planReferencePaths = data['planReferences'];
    const promise = planReferencePaths.map(path => {
        return new Plan_1.Plan(admin.firestore().doc(path)).fetch();
    });
    const plans = await Promise.all(promise);
    const metadata = data['metadata'] || {};
    const subscriptionOptions = {
        vendorType: 'stripe',
        customer: customer,
        metadata: {
            ...metadata,
            uid: uid
        }
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