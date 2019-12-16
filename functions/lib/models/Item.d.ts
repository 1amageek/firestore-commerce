import { Doc, DocumentReference, CollectionReference } from '@1amageek/ballcap-admin';
import { ItemProtocol } from '@1amageek/tradestore';
export declare class Item extends Doc implements ItemProtocol {
    static collectionReference(): CollectionReference;
    purchasedBy: string;
    selledBy: string;
    orderReference?: DocumentReference;
    subscriptionReference?: DocumentReference;
    productReference?: DocumentReference;
    skuReference?: DocumentReference;
    planReference?: DocumentReference;
    isPrivate: boolean;
    isCancelled: boolean;
    stockReference?: DocumentReference;
    metadata?: {
        [key: string]: any;
    };
}
