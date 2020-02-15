import { Doc, Collection, CollectionReference } from '@1amageek/ballcap-admin';
import { SKU } from './SKU';
import { Plan } from './Plan';
export declare type ProductType = 'service' | 'good';
export declare class Product extends Doc {
    static collectionReference(): CollectionReference;
    type: ProductType;
    name: string;
    caption?: string;
    description?: string;
    isAvailable: boolean;
    metadata?: any;
    SKUs: Collection<SKU>;
    plans: Collection<Plan>;
}
