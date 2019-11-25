import { Doc, Collection, CollectionReference } from '@1amageek/ballcap-admin';
import { SKU } from './SKU';
import { Plan } from './Plan';
export declare class Product extends Doc {
    static collectionReference(): CollectionReference;
    metadata?: any;
    SKUs: Collection<SKU>;
    plans: Collection<Plan>;
}
