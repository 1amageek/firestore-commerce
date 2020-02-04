/// <reference types="express" />
export declare const customer: {
    create: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    update: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    retrieve: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
};
export declare const paymentMethod: {
    create: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    retrieve: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    list: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    attach: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    detach: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
};
export declare const paymentIntent: {
    create: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    retrieve: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    update: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    confirm: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    capture: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
    cancel: import("firebase-functions").TriggerAnnotated & ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary>, resp: import("express").Response) => void) & import("firebase-functions").Runnable<any>;
};
