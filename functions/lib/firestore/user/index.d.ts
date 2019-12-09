export declare const product: {
    plan: {
        onCreate: import("firebase-functions").CloudFunction<FirebaseFirestore.DocumentSnapshot>;
        onUpdate: import("firebase-functions").CloudFunction<import("firebase-functions").Change<FirebaseFirestore.DocumentSnapshot>>;
    };
    sku: {
        onCreate: import("firebase-functions").CloudFunction<FirebaseFirestore.DocumentSnapshot>;
        onUpdate: import("firebase-functions").CloudFunction<import("firebase-functions").Change<FirebaseFirestore.DocumentSnapshot>>;
    };
    onCreate: import("firebase-functions").CloudFunction<FirebaseFirestore.DocumentSnapshot>;
    onUpdate: import("firebase-functions").CloudFunction<import("firebase-functions").Change<FirebaseFirestore.DocumentSnapshot>>;
};
