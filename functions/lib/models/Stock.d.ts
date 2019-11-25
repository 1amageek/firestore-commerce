import { Doc, DocumentReference, CollectionReference } from '@1amageek/ballcap-admin';
import { StockProtocol } from '@1amageek/tradestore';
export declare class Stock extends Doc implements StockProtocol {
    static collectionReference(): CollectionReference;
    isAvailable: boolean;
    itemReference?: DocumentReference;
    orderReference?: DocumentReference;
}
