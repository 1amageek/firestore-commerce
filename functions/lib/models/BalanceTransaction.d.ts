import { Doc, CollectionReference } from '@1amageek/ballcap-admin';
import { ShardType, BalanceTransactionProtocol, Currency, BalanceTransactionType, TransactionResult } from '@1amageek/tradestore';
export declare class BalanceTransaction extends Doc implements BalanceTransactionProtocol {
    static collectionReference(): CollectionReference;
    shard: ShardType;
    type: BalanceTransactionType;
    currency: Currency;
    amount: number;
    from: string;
    to: string;
    order?: string | undefined;
    transfer?: string | undefined;
    payout?: string | undefined;
    transactionResults: TransactionResult[];
}
