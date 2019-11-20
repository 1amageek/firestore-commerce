import { Doc, Collection, Field, SubCollection, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { Tradable, Publishable } from '@1amageek/tradestore'
import { TradeTransaction } from './TradeTransaction'
import { Item } from './Item'
import { OrderItem } from './OrderItem'
import { Order } from './Order'
import { Subscription } from './Subscription'
import { SubscriptionItem } from './SubscriptionItem'

export class User extends Doc implements Tradable<Order, OrderItem, TradeTransaction, Subscription, SubscriptionItem>, Publishable<User, Subscription, SubscriptionItem> {

	parentReference(): CollectionReference {
		return firestore.collection("commerce")
	}

    @Field isAvailable: boolean = false
    @Field country: string = "JP"

    @SubCollection orders: Collection<Order> = new Collection()
    @SubCollection receivedOrders: Collection<Order> = new Collection()
    @SubCollection items: Collection<Item> = new Collection()
    @SubCollection tradeTransactions: Collection<TradeTransaction> = new Collection()
    @SubCollection subscriptions: Collection<Subscription> = new Collection()
    @SubCollection subscribers: Collection<User> = new Collection()
}