import { Doc, Field, DocumentReference, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { ShardType, randomShard, DafaultShardCharacters, TradeTransactionProtocol, TradeTransactionType } from '@1amageek/tradestore'

export class TradeTransaction extends Doc implements TradeTransactionProtocol {

	static collectionReference(): CollectionReference {
		return firestore.collection("commerce/1/tradeTransactions")
	}

	@Field shard: ShardType = randomShard(DafaultShardCharacters)
	@Field type: TradeTransactionType = TradeTransactionType.unknown
	@Field selledBy: string = ''
	@Field purchasedBy: string = ''
	@Field orderReference!: DocumentReference
	@Field productReference?: DocumentReference
	@Field skuRefernece!: DocumentReference
	@Field itemReference!: DocumentReference
	@Field stockReference?: DocumentReference
}
