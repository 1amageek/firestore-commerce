import { Doc, Field, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { PayoutProtocol, Currency, PayoutStatus, TransactionResult } from '@1amageek/tradestore'

export class Payout extends Doc implements PayoutProtocol {

	static collectionReference(): CollectionReference {
		return firestore.collection("commerce/1/payouts")
	}

	@Field currency: Currency = Currency.JPY
	@Field amount: number = 0
	@Field account: string = ""
	@Field status: PayoutStatus = PayoutStatus.none
	@Field transactionResults: TransactionResult[] = []
	@Field isCancelled: boolean = false
}
