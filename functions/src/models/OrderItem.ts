import { Model, File, Field, DocumentReference } from '@1amageek/ballcap-admin'
import { OrderItemProtocol, Currency, OrderItemType, OrderItemStatus } from '@1amageek/tradestore'

export class OrderItem extends Model implements OrderItemProtocol {
	@Field name?: string
	@Field thumbnailImage?: File
	@Field createdBy!: string
	@Field order: string = ''
	@Field purchasedBy: string = ''
	@Field selledBy: string = ''
	@Field type: OrderItemType = OrderItemType.sku
	@Field productReference?: DocumentReference
	@Field sku?: string
	@Field quantity: number = 0
	@Field currency: Currency = Currency.JPY
	@Field amount: number = 0
	@Field status: OrderItemStatus = OrderItemStatus.none
}