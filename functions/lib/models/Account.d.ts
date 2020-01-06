import { Doc, Collection, CollectionReference } from '@1amageek/ballcap-admin';
import { AccountProtocol, Balance } from '@1amageek/tradestore';
import { BalanceTransaction } from './BalanceTransaction';
import { Payout } from './Payout';
export declare class Account extends Doc implements AccountProtocol<BalanceTransaction, Payout> {
    static collectionReference(): CollectionReference;
    venders: {
        [key: string]: any;
    };
    country: string;
    isRejected: boolean;
    isSigned: boolean;
    hasLegalEntity: boolean;
    commissionRate: number;
    balance: Balance;
    accountInformation: {
        [key: string]: any;
    };
    IPAddress?: string;
    metadata?: {
        [key: string]: any;
    };
    balanceTransactions: Collection<BalanceTransaction>;
    payoutRequests: Collection<Payout>;
}
