import { Doc, Collection, Field, DocumentReference, SubCollection, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { SKUProtocol, Currency, Inventory, StockType } from '@1amageek/tradestore'
import { Stock } from './Stock'

export class SKU extends Doc implements SKUProtocol<Stock> {

	parentReference(): CollectionReference {
		return firestore.collection("commerce")
	}

	@Field isAvailable: boolean = true
	@Field selledBy!: string
	@Field createdBy!: string
	@Field numberOfFetch: number = 5
	@Field currency: Currency = Currency.JPY
	@Field productReference?: DocumentReference
	@Field name!: string
	@Field caption!: string
	@Field amount: number = 0
	@Field inventory: Inventory = { type: StockType.finite, quantity: 1 }
	@Field isPrivated: boolean = false
	@SubCollection stocks: Collection<Stock> = new Collection()
}