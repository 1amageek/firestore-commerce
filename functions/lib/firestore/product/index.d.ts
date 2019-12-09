import * as functions from 'firebase-functions';
export declare const plan: {
    onCreate: functions.CloudFunction<FirebaseFirestore.DocumentSnapshot>;
    onUpdate: functions.CloudFunction<functions.Change<FirebaseFirestore.DocumentSnapshot>>;
};
export declare const sku: {
    onCreate: functions.CloudFunction<FirebaseFirestore.DocumentSnapshot>;
    onUpdate: functions.CloudFunction<functions.Change<FirebaseFirestore.DocumentSnapshot>>;
};
export declare const onCreate: functions.CloudFunction<FirebaseFirestore.DocumentSnapshot>;
export declare const onUpdate: functions.CloudFunction<functions.Change<FirebaseFirestore.DocumentSnapshot>>;
