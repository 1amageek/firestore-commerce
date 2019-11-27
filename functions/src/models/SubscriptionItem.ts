import { Model, Field, DocumentReference } from '@1amageek/ballcap-admin'
import { Currency, SubscriptionItemProtocol } from '@1amageek/tradestore'

export class SubscriptionItem extends Model implements SubscriptionItemProtocol {
	@Field subscribedBy!: string
	@Field publishedBy!: string
	@Field createdBy!: string
	@Field productReference?: DocumentReference
	@Field planReference!: DocumentReference
	@Field quantity: number = 0
	@Field taxRates: number = 0
	@Field amount: number = 0
	@Field currency: Currency = Currency.JPY
}
