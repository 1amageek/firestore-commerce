import { OrderItemProtocol, OrderProtocol, TradeDelegate } from '@1amageek/tradestore';
import { DocumentReference, Transaction, QuerySnapshot } from '@1amageek/ballcap-admin';
export declare class TradeController implements TradeDelegate {
    reserve<OrderItem extends OrderItemProtocol, Order extends OrderProtocol<OrderItem>>(order: Order, orderItem: OrderItem, transaction: Transaction): void;
    createItem<T extends OrderItemProtocol, U extends OrderProtocol<T>>(order: U, orderItem: T, stockReference: DocumentReference | undefined, transaction: Transaction): DocumentReference;
    cancelItem<T extends OrderItemProtocol, U extends OrderProtocol<T>>(order: U, orderItem: T, item: DocumentReference, transaction: Transaction): void;
    getItems<T extends OrderItemProtocol, U extends OrderProtocol<T>>(order: U, orderItem: T, transaction: Transaction): Promise<QuerySnapshot>;
}
