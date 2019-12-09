import * as functions from 'firebase-functions';
export declare const onCreate: functions.CloudFunction<FirebaseFirestore.DocumentSnapshot>;
export declare const onUpdate: functions.CloudFunction<functions.Change<FirebaseFirestore.DocumentSnapshot>>;
