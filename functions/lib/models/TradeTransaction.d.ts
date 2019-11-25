import { Doc, DocumentReference, CollectionReference } from '@1amageek/ballcap-admin';
import { ShardType, TradeTransactionProtocol, TradeTransactionType } from '@1amageek/tradestore';
export declare class TradeTransaction extends Doc implements TradeTransactionProtocol {
    static collectionReference(): CollectionReference;
    shard: ShardType;
    type: TradeTransactionType;
    selledBy: string;
    purchasedBy: string;
    orderReference: DocumentReference;
    productReference?: DocumentReference;
    skuRefernece: DocumentReference;
    itemReference: DocumentReference;
    stockReference?: DocumentReference;
}
