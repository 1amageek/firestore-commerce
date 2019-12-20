import { Doc, Field, DocumentReference, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { ItemProtocol } from '@1amageek/tradestore'

export class Item extends Doc implements ItemProtocol {

	static collectionReference(): CollectionReference {
		return firestore.collection('commerce/1/items')
	}

	@Field purchasedBy!: string
	@Field selledBy: string = ''
	@Field orderReference?: DocumentReference
	@Field subscriptionReference?: DocumentReference
	@Field productReference?: DocumentReference
	@Field skuReference?: DocumentReference
	@Field planReference?: DocumentReference
	@Field isPrivate: boolean = false
	@Field isCancelled: boolean = false
	@Field stockReference?: DocumentReference
	@Field metadata?: { [key: string]: any }
}
