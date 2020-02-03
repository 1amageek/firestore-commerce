import { Model, DocumentReference } from '@1amageek/ballcap-admin';
import { Currency, SubscriptionItemProtocol } from '@1amageek/tradestore';
export declare class SubscriptionItem extends Model implements SubscriptionItemProtocol {
    subscribedBy: string;
    publishedBy: string;
    createdBy: string;
    productReference?: DocumentReference;
    planReference: DocumentReference;
    quantity: number;
    taxRates: number;
    amount: number;
    currency: Currency;
    metadata?: any;
}
