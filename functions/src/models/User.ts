import { Doc, Collection, Field, SubCollection, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { UserProtocol } from '@1amageek/tradestore'
import { TradeTransaction } from './TradeTransaction'
import { Item } from './Item'
import { OrderItem } from './OrderItem'
import { Order } from './Order'

export class User extends Doc implements UserProtocol<Order, OrderItem, TradeTransaction> {

	parentReference(): CollectionReference {
		return firestore.collection("commerce")
	}

    @Field isAvailable: boolean = false
    @Field country: string = "JP"

    @SubCollection orders: Collection<Order> = new Collection()
    @SubCollection receivedOrders: Collection<Order> = new Collection()
    @SubCollection items: Collection<Item> = new Collection()
    @SubCollection tradeTransactions: Collection<TradeTransaction> = new Collection()
}