import { Doc, Field, Timestamp, FieldValue, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { ShardType, randomShard, DafaultShardCharacters, Interval, Period, SubscriptionProtocol, SubscriptionStatus, SubscriptionResult } from '@1amageek/tradestore'
import { SubscriptionItem } from './SubscriptionItem'

export class Subscription extends Doc implements SubscriptionProtocol<SubscriptionItem> {

	static collectionReference(): CollectionReference {
		return firestore.collection('commerce/1/subscriptions')
	}

	@Field shard: ShardType = randomShard(DafaultShardCharacters)
	@Field subscribedBy!: string
	@Field publishedBy!: string
	@Field createdBy!: string
	@Field isCancelled: boolean = false
	@Field interval: Interval = Interval.month
	@Field intervalCount: number = 1
	@Field startAt: Timestamp = FieldValue.serverTimestamp()
	@Field canceledAt?: Timestamp
	@Field cancelAtPeriodEnd: boolean = false
	@Field endedAt?: Timestamp
	@Field items: SubscriptionItem[] = []
	@Field status: SubscriptionStatus = SubscriptionStatus.incomplete
	@Field trial?: Period
	@Field result?: SubscriptionResult
	@Field metadata?: any
}
