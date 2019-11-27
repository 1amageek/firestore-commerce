import { Doc, Collection, CollectionReference } from '@1amageek/ballcap-admin';
import { Tradable, Publishable } from '@1amageek/tradestore';
import { TradeTransaction } from './TradeTransaction';
import { Item } from './Item';
import { OrderItem } from './OrderItem';
import { Order } from './Order';
import { Product } from './Product';
import { Subscription } from './Subscription';
import { SubscriptionItem } from './SubscriptionItem';
export declare class User extends Doc implements Tradable<Order, OrderItem, TradeTransaction, Subscription, SubscriptionItem>, Publishable<User, Subscription, SubscriptionItem> {
    static collectionReference(): CollectionReference;
    isAvailable: boolean;
    country: string;
    products: Collection<Product>;
    orders: Collection<Order>;
    receivedOrders: Collection<Order>;
    items: Collection<Item>;
    tradeTransactions: Collection<TradeTransaction>;
    subscriptions: Collection<Subscription>;
    subscribers: Collection<User>;
}
