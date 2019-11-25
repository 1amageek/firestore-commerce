import { Model, File, DocumentReference } from '@1amageek/ballcap-admin';
import { OrderItemProtocol, Currency, OrderItemType, OrderItemStatus } from '@1amageek/tradestore';
export declare class OrderItem extends Model implements OrderItemProtocol {
    name?: string;
    thumbnailImage?: File;
    createdBy: string;
    order: string;
    purchasedBy: string;
    selledBy: string;
    type: OrderItemType;
    productReference?: DocumentReference;
    sku?: string;
    quantity: number;
    currency: Currency;
    amount: number;
    status: OrderItemStatus;
}
