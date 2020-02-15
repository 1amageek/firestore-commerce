export declare const product: {
    plan: {
        onCreate: import("firebase-functions").CloudFunction<import("firebase-functions/lib/providers/firestore").DocumentSnapshot>;
        onUpdate: import("firebase-functions").CloudFunction<import("firebase-functions").Change<import("firebase-functions/lib/providers/firestore").DocumentSnapshot>>;
    };
    sku: {
        onCreate: import("firebase-functions").CloudFunction<import("firebase-functions/lib/providers/firestore").DocumentSnapshot>;
        onUpdate: import("firebase-functions").CloudFunction<import("firebase-functions").Change<import("firebase-functions/lib/providers/firestore").DocumentSnapshot>>;
    };
    onCreate: import("firebase-functions").CloudFunction<import("firebase-functions/lib/providers/firestore").DocumentSnapshot>;
    onUpdate: import("firebase-functions").CloudFunction<import("firebase-functions").Change<import("firebase-functions/lib/providers/firestore").DocumentSnapshot>>;
};
