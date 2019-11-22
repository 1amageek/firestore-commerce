import { Doc, Field, Collection, SubCollection, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { SKU } from './SKU'
import { Plan } from './Plan'

export class Product extends Doc {

	static collectionReference(): CollectionReference {
		return firestore.collection("commerce/1/products")
	}
	
	@Field metadata?: any
    @SubCollection SKUs: Collection<SKU> = new Collection()
    @SubCollection plans: Collection<Plan> = new Collection()
}