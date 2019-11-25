/// <reference types="express" />
import * as functions from 'firebase-functions';
import { PaymentOptions } from '@1amageek/tradestore';
import { Account } from './models/Account';
import { User } from './models/User';
import { SKU } from './models/SKU';
import { Plan } from './models/Plan';
import { Order } from './models/Order';
import { OrderItem } from './models/OrderItem';
import { Subscription } from './models/Subscription';
import { SubscriptionItem } from './models/SubscriptionItem';
import { Stock } from './models/Stock';
import { BalanceTransaction } from './models/BalanceTransaction';
import { TradeTransaction } from './models/TradeTransaction';
export { Account, User, SKU, Plan, Order, OrderItem, Subscription, SubscriptionItem, Stock, PaymentOptions, BalanceTransaction, TradeTransaction };
export declare const createAccount: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
export declare const checkout: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
export declare const subscribe: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
