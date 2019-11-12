import { Doc, Field, DocumentReference, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { ItemProtocol } from '@1amageek/tradestore'

export class Item extends Doc implements ItemProtocol {

	parentReference(): CollectionReference {
		return firestore.collection("commerce")
	}

	@Field isCancelled: boolean = false

	@Field isPrivated: boolean = false

	@Field passTypeIdentifier!: string

	@Field selledBy!: string

	@Field purchasedBy!: string

	@Field orderReference!: DocumentReference

	@Field productReference?: DocumentReference

	@Field skuReference!: DocumentReference

	@Field stockReference?: DocumentReference
}