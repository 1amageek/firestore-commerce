import { Doc, Collection, CollectionReference, DocumentReference, Timestamp } from '@1amageek/ballcap-admin';
import { PlanProtocol, Currency, TiersMode, Tier, Interval } from '@1amageek/tradestore';
import { Subscription } from './Subscription';
import { SubscriptionItem } from './SubscriptionItem';
export declare class Plan extends Doc implements PlanProtocol<Subscription, SubscriptionItem> {
    static collectionReference(): CollectionReference;
    publishedBy: string;
    createdBy: string;
    productReference?: DocumentReference;
    currency: Currency;
    amount: number;
    interval: Interval;
    intervalCount: number;
    tiers?: Tier[];
    tiersMode?: TiersMode;
    trialPeriodDays?: Timestamp;
    isAvailable: boolean;
    metadata?: any;
    subscriptions: Collection<Subscription>;
}
