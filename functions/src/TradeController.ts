import { OrderItemProtocol, OrderProtocol, TradeDelegate } from '@1amageek/tradestore'
import { DocumentReference, Transaction, QuerySnapshot } from '@1amageek/ballcap-admin'
import { Item } from './models/Item'
import { User } from './models/User'

export class TradeController implements TradeDelegate {

	reserve<OrderItem extends OrderItemProtocol, Order extends OrderProtocol<OrderItem>>(order: Order, orderItem: OrderItem, transaction: Transaction): void {
		return
	}

	createItem<T extends OrderItemProtocol, U extends OrderProtocol<T>>(order: U, orderItem: T, stockReference: DocumentReference | undefined, transaction: Transaction): DocumentReference {
		const purchaser: User = new User(order.purchasedBy)
		const item: Item = new Item(purchaser.items.collectionReference.doc())
		item.selledBy = orderItem.selledBy
		item.orderReference = order.documentReference
		item.productReference = orderItem.productReference
		item.skuReference = orderItem.skuReference!
		item.stockReference = stockReference
		transaction.set(purchaser.items.collectionReference.doc(item.id), item.data(), { merge: true })
		return item.documentReference
	}

	cancelItem<T extends OrderItemProtocol, U extends OrderProtocol<T>>(order: U, orderItem: T, item: DocumentReference, transaction: Transaction): void {
		transaction.set(item, {
			isCancelled: true
		}, { merge: true })
	}

	async getItems<T extends OrderItemProtocol, U extends OrderProtocol<T>>(order: U, orderItem: T, transaction: Transaction): Promise<QuerySnapshot> {
		const purchaser: User = new User(order.purchasedBy)
		const query = purchaser.items.collectionReference.where('orderReference', '==', order.documentReference)
		const items = await transaction.get(query)
		return items
	}
}
