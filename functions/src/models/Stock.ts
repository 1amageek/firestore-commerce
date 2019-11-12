import { Doc, Field, DocumentReference, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { StockProtocol } from '@1amageek/tradestore'

export class Stock extends Doc implements StockProtocol {

	parentReference(): CollectionReference {
		return firestore.collection("commerce")
	}

	@Field isAvailable: boolean = true
	@Field itemReference?: DocumentReference
	@Field orderReference?: DocumentReference
}
