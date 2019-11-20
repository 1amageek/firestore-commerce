import { Doc, Field, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { ShardType, randomShard, DafaultShardCharacters, BalanceTransactionProtocol, Currency, BalanceTransactionType, TransactionResult } from '@1amageek/tradestore'

export class BalanceTransaction extends Doc implements BalanceTransactionProtocol {

	parentReference(): CollectionReference {
		return firestore.collection("commerce")
	}

	@Field shard: ShardType = randomShard(DafaultShardCharacters)
	@Field type: BalanceTransactionType = BalanceTransactionType.payment
	@Field currency: Currency = Currency.USD
	@Field amount: number = 0
	@Field from!: string
	@Field to!: string
	@Field order?: string | undefined
	@Field transfer?: string | undefined
	@Field payout?: string | undefined
	@Field transactionResults: TransactionResult[] = []
}
