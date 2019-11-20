import { Doc, Field, Timestamp, FieldValue, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { ShardType, randomShard, DafaultShardCharacters, Interval, Period, SubscriptionProtocol, SubscriptionStatus, SubscriptionResult } from '@1amageek/tradestore'
import { SubscriptionItem } from './SubscriptionItem'

export class Subscription extends Doc implements SubscriptionProtocol<SubscriptionItem> {

	parentReference(): CollectionReference {
		return firestore.collection("commerce")
	}

	@Field shard: ShardType = randomShard(DafaultShardCharacters)
	@Field subscribedBy!: string
	@Field publishedBy!: string
	@Field createdBy!: string
	@Field interval: Interval = Interval.month
	@Field intervalCount: number = 1
	@Field startAt: Timestamp | FieldValue = FieldValue.serverTimestamp()
	@Field canceledAt?: Timestamp | FieldValue;
	@Field cancelAtPeriodEnd: boolean = false
	@Field endedAt?: Timestamp | FieldValue;
	@Field items: SubscriptionItem[] = []
	@Field status: SubscriptionStatus = SubscriptionStatus.incomplete
	@Field trial?: Period
	@Field result?: SubscriptionResult
}