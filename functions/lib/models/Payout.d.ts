import { Doc, CollectionReference } from '@1amageek/ballcap-admin';
import { PayoutProtocol, Currency, PayoutStatus, TransactionResult } from '@1amageek/tradestore';
export declare class Payout extends Doc implements PayoutProtocol {
    static collectionReference(): CollectionReference;
    currency: Currency;
    amount: number;
    account: string;
    status: PayoutStatus;
    transactionResults: TransactionResult[];
    isCancelled: boolean;
    metadata?: any;
}
