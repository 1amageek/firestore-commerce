/// <reference types="express" />
export declare const customer: {
    create: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    update: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
};
