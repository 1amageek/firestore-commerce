import { Doc, Timestamp, FieldValue, CollectionReference } from '@1amageek/ballcap-admin';
import { ShardType, Interval, Period, SubscriptionProtocol, SubscriptionStatus, SubscriptionResult } from '@1amageek/tradestore';
import { SubscriptionItem } from './SubscriptionItem';
export declare class Subscription extends Doc implements SubscriptionProtocol<SubscriptionItem> {
    static collectionReference(): CollectionReference;
    shard: ShardType;
    subscribedBy: string;
    publishedBy: string;
    createdBy: string;
    interval: Interval;
    intervalCount: number;
    startAt: Timestamp | FieldValue;
    canceledAt?: Timestamp | FieldValue;
    cancelAtPeriodEnd: boolean;
    endedAt?: Timestamp | FieldValue;
    items: SubscriptionItem[];
    status: SubscriptionStatus;
    trial?: Period;
    result?: SubscriptionResult;
}
