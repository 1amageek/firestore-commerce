import { Doc, Collection, SubCollection, Field, CollectionReference, firestore } from '@1amageek/ballcap-admin'
import { AccountProtocol, Balance } from '@1amageek/tradestore'
import { BalanceTransaction } from "./BalanceTransaction"
import { Payout } from './Payout'

export class Account extends Doc implements AccountProtocol<BalanceTransaction, Payout> {

	parentReference(): CollectionReference {
		return firestore.collection("commerce")
	}

	@Field stripeID?: string
	@Field country: string = ""
	@Field isRejected: boolean = false
	@Field isSigned: boolean = false
	@Field hasLegalEntity: boolean = false
	@Field commissionRate: number = 10
	@Field balance: Balance = { available: {}, pending: {} }
	@Field accountInformation: { [key: string]: any } = {}
	@Field IPAddress?: string
	@Field metadata?: { [key: string]: any } = {}

	// SubCollection
	@SubCollection balanceTransactions: Collection<BalanceTransaction> = new Collection()
	@SubCollection payoutRequests: Collection<Payout> = new Collection()
}
