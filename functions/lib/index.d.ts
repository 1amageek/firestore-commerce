/// <reference types="express" />
import * as functions from 'firebase-functions';
import { PaymentOptions } from '@1amageek/tradestore';
import { Account } from './models/Account';
import { User } from './models/User';
import { Product } from './models/Product';
import { SKU } from './models/SKU';
import { Plan } from './models/Plan';
import { Order } from './models/Order';
import { OrderItem } from './models/OrderItem';
import { Item } from './models/Item';
import { Subscription } from './models/Subscription';
import { SubscriptionItem } from './models/SubscriptionItem';
import { Stock } from './models/Stock';
import { Payout } from './models/Payout';
import { BalanceTransaction } from './models/BalanceTransaction';
import { TradeTransaction } from './models/TradeTransaction';
export { Account, User, Product, SKU, Plan, Order, OrderItem, Item, Subscription, SubscriptionItem, Stock, Payout, PaymentOptions, BalanceTransaction, TradeTransaction };
export declare const auth: {
    setCustomer: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
    setPaymentMethod: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
    setDefaultPaymentMethod: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
};
export declare const firestore: {
    product: {
        plan: {
            onCreate: functions.CloudFunction<functions.firestore.DocumentSnapshot>;
            onUpdate: functions.CloudFunction<functions.Change<functions.firestore.DocumentSnapshot>>;
        };
        sku: {
            onCreate: functions.CloudFunction<functions.firestore.DocumentSnapshot>;
            onUpdate: functions.CloudFunction<functions.Change<functions.firestore.DocumentSnapshot>>;
        };
        onCreate: functions.CloudFunction<functions.firestore.DocumentSnapshot>;
        onUpdate: functions.CloudFunction<functions.Change<functions.firestore.DocumentSnapshot>>;
    };
    user: {
        product: {
            plan: {
                onCreate: functions.CloudFunction<functions.firestore.DocumentSnapshot>;
                onUpdate: functions.CloudFunction<functions.Change<functions.firestore.DocumentSnapshot>>;
            };
            sku: {
                onCreate: functions.CloudFunction<functions.firestore.DocumentSnapshot>;
                onUpdate: functions.CloudFunction<functions.Change<functions.firestore.DocumentSnapshot>>;
            };
            onCreate: functions.CloudFunction<functions.firestore.DocumentSnapshot>;
            onUpdate: functions.CloudFunction<functions.Change<functions.firestore.DocumentSnapshot>>;
        };
    };
};
export declare const stripe: {
    customer: {
        create: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        update: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        retrieve: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
    };
    paymentMethod: {
        create: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        retrieve: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        list: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        attach: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        detach: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
    };
    paymentIntent: {
        create: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        retrieve: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        update: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        confirm: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        capture: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        cancel: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
    };
    subscriptionSchedule: {
        create: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        retrieve: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        update: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        list: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        release: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
        cancel: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
    };
};
export declare const checkout: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
export declare const subscribe: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
