import { Doc, Collection, DocumentReference, CollectionReference } from '@1amageek/ballcap-admin';
import { SKUProtocol, Currency, Inventory } from '@1amageek/tradestore';
import { Stock } from './Stock';
export declare class SKU extends Doc implements SKUProtocol<Stock> {
    static collectionReference(): CollectionReference;
    isAvailable: boolean;
    selledBy: string;
    createdBy: string;
    numberOfFetch: number;
    currency: Currency;
    productReference?: DocumentReference;
    name: string;
    caption: string;
    amount: number;
    inventory: Inventory;
    isPrivated: boolean;
    stocks: Collection<Stock>;
}
