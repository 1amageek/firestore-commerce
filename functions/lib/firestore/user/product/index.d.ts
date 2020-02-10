import * as functions from 'firebase-functions';
export declare const plan: {
    onCreate: functions.CloudFunction<functions.firestore.DocumentSnapshot>;
    onUpdate: functions.CloudFunction<functions.Change<functions.firestore.DocumentSnapshot>>;
};
export declare const sku: {
    onCreate: functions.CloudFunction<functions.firestore.DocumentSnapshot>;
    onUpdate: functions.CloudFunction<functions.Change<functions.firestore.DocumentSnapshot>>;
};
export declare const onCreate: functions.CloudFunction<functions.firestore.DocumentSnapshot>;
export declare const onUpdate: functions.CloudFunction<functions.Change<functions.firestore.DocumentSnapshot>>;
