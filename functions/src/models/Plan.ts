import { Doc, Field, Collection, SubCollection, firestore, CollectionReference, DocumentReference, Timestamp } from '@1amageek/ballcap-admin'
import { PlanProtocol, Currency, TiersMode, Tier, Interval } from '@1amageek/tradestore'
import { Subscription } from './subscription'
import { SubscriptionItem } from './SubscriptionItem'

export class Plan extends Doc implements PlanProtocol<Subscription, SubscriptionItem> {

	parentReference(): CollectionReference {
		return firestore.collection("commerce")
	}

	@Field publishedBy!: string
	@Field createdBy!: string
	@Field productReference?: DocumentReference
	@Field currency: Currency = Currency.JPY
	@Field amount: number = 0
	@Field interval: Interval = Interval.month
	@Field intervalCount: number = 1
	@Field tiers?: Tier[]
	@Field tiersMode?: TiersMode
	@Field trialPeriodDays?: Timestamp
	@Field isAvailable: boolean = true
	@Field metadata?: any
	@SubCollection subscriptions: Collection<Subscription> = new Collection()
}