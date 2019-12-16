import { Doc, DocumentReference, CollectionReference } from '@1amageek/ballcap-admin';
import { ItemProtocol } from '@1amageek/tradestore';
export declare class Item extends Doc implements ItemProtocol {
    static collectionReference(): CollectionReference;
    isCancelled: boolean;
    isPrivate: boolean;
    passTypeIdentifier: string;
    selledBy: string;
    purchasedBy: string;
    orderReference: DocumentReference;
    productReference?: DocumentReference;
    skuReference: DocumentReference;
    stockReference?: DocumentReference;
}
