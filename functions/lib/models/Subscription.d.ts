import { Doc, Timestamp, CollectionReference } from '@1amageek/ballcap-admin';
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
    startAt: Timestamp;
    canceledAt?: Timestamp;
    cancelAtPeriodEnd: boolean;
    endedAt?: Timestamp;
    items: SubscriptionItem[];
    status: SubscriptionStatus;
    trial?: Period;
    result?: SubscriptionResult;
    metadata?: any;
}
