import { Doc, Timestamp, File, DocumentReference, CollectionReference } from '@1amageek/ballcap-admin';
import { ShardType, OrderProtocol, Currency, OrderPaymentStatus, OrderTransferStatus, DeliveryStatus, TransactionResult } from '@1amageek/tradestore';
import { OrderItem } from './OrderItem';
export declare class Order extends Doc implements OrderProtocol<OrderItem> {
    static collectionReference(): CollectionReference;
    shard: ShardType;
    parentID?: string;
    title?: string;
    assets: File[];
    purchasedBy: string;
    selledBy: string;
    shippingTo: {
        [key: string]: string;
    };
    transferredTo: DocumentReference[];
    paidAt?: Timestamp;
    expirationDate?: Timestamp;
    shippingDate?: any;
    estimatedArrivalDate?: any;
    currency: Currency;
    amount: number;
    items: OrderItem[];
    deliveryStatus: DeliveryStatus;
    paymentStatus: OrderPaymentStatus;
    transferStatus: OrderTransferStatus;
    transactionResults: TransactionResult[];
    isCancelled: boolean;
}
