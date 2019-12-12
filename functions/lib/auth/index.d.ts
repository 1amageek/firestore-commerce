/// <reference types="express" />
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
export declare const setCustomer: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
export declare const onCreate: functions.CloudFunction<admin.auth.UserRecord>;
export declare const setPaymentMethod: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
export declare const setDefaultPaymentMethod: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
