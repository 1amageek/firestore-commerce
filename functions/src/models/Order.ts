import { Doc, Field, Timestamp, File, DocumentReference, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import { ShardType, randomShard, DafaultShardCharacters, OrderProtocol, Currency, OrderPaymentStatus, OrderTransferStatus, TransactionResult } from '@1amageek/tradestore'
import { OrderItem } from './OrderItem'

export class Order extends Doc implements OrderProtocol<OrderItem> {

	static collectionReference(): CollectionReference {
		return firestore.collection("commerce/1/orders")
	}

	@Field shard: ShardType = randomShard(DafaultShardCharacters)
	@Field parentID?: string
	@Field title?: string
	@Field assets: File[] = []
	@Field purchasedBy!: string
	@Field selledBy!: string
	@Field shippingTo!: { [key: string]: string }
	@Field transferredTo: DocumentReference[] = []
	@Field paidAt?: Timestamp
	@Field expirationDate?: Timestamp
	@Field currency: Currency = Currency.JPY
	@Field amount: number = 0
	@Field items: OrderItem[] = []
	@Field paymentStatus: OrderPaymentStatus = OrderPaymentStatus.none
	@Field transferStatus: OrderTransferStatus = OrderTransferStatus.none
	@Field transactionResults: TransactionResult[] = []
	@Field isCancelled: boolean = false
}
