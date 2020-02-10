import * as functions from 'firebase-functions';
export declare const onCreate: functions.CloudFunction<functions.firestore.DocumentSnapshot>;
export declare const onUpdate: functions.CloudFunction<functions.Change<functions.firestore.DocumentSnapshot>>;
