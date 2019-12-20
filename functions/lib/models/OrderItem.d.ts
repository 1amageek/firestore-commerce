import { Model, File, DocumentReference } from '@1amageek/ballcap-admin';
import { OrderItemProtocol, Currency, OrderItemType, OrderItemStatus } from '@1amageek/tradestore';
export declare class OrderItem extends Model implements OrderItemProtocol {
    purchasedBy: string;
    selledBy: string;
    createdBy: string;
    type: OrderItemType;
    productReference?: DocumentReference;
    skuReference?: DocumentReference;
    quantity: number;
    currency: Currency;
    amount: number;
    status: OrderItemStatus;
    name: string;
    thumbnailImage?: File;
}
