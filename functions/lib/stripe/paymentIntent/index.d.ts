/// <reference types="express" />
import * as functions from 'firebase-functions';
export declare const create: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
export declare const retrieve: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
export declare const update: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
export declare const confirm: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
export declare const capture: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
export declare const cancel: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response) => void) & functions.Runnable<any>;
