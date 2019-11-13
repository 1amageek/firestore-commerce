import * as functions from 'firebase-functions'
import { PaymentDelegate, OrderItemProtocol, OrderProtocol, Currency, BalanceTransactionProtocol, AccountProtocol, PayoutProtocol, TransferOptions, PayoutOptions, PaymentOptions } from '@1amageek/tradestore'
import * as Stripe from 'stripe'
import config from './config'


export class StripeController implements PaymentDelegate {

	stripe() {
		const STRIPE_API_KEY = config.stripe.api_key
		if (!STRIPE_API_KEY) {
			throw new functions.https.HttpsError('invalid-argument', 'The functions requires STRIPE_API_KEY.')
		}
		const stripe = new Stripe(STRIPE_API_KEY)
		return stripe
	}

	async authorize<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, options: PaymentOptions) {
		
		const stripe = this.stripe()

		const idempotency_key = order.id
		const data: Stripe.charges.IChargeCreationOptions = {
			amount: order.amount,
			currency: order.currency,
			capture: false,
			description: `Charge for user/${order.purchasedBy}`
		}

		if (options) {
			if (options.customer) {
				data.customer = options.customer
			}
			if (options.source) {
				data.source = options.source
			}
		}

		try {
			const charge = await stripe.charges.create(data, {
				idempotency_key: idempotency_key
			})
			return charge
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	async authorizeCancel<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, options: PaymentOptions) {
		throw new Error("Method not implemented.");
	}

	async pay<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, options: PaymentOptions) {

		const stripe = this.stripe()

		const idempotency_key = order.id
		const data: Stripe.charges.IChargeCreationOptions = {
			amount: order.amount,
			currency: order.currency,
			description: `Charge for user/${order.purchasedBy}`
		}

		if (options) {
			if (options.customer) {
				data.customer = options.customer
			}
			if (options.source) {
				data.source = options.source
			}
		}


		try {
			const charge = await stripe.charges.create(data, {
				idempotency_key: idempotency_key
			})
			return charge
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	async refund<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, options: PaymentOptions, reason?: string | undefined) {

		const stripe = this.stripe()

		const transactionResults = order.transactionResults
		const transactionResult = transactionResults[transactionResults.length - 1]
		const stripeCharge = transactionResult["stripe"] as Stripe.charges.ICharge
		const charegeID = stripeCharge.id
		const idempotency_key = `refund:${order.id}`

		const data: Stripe.refunds.IRefundCreationOptions = {}
		data.amount = amount
		if (reason) {
			data.reason = reason
		}

		try {
			return await stripe.charges.refund(charegeID, data, {
				idempotency_key: idempotency_key
			})
		} catch (error) {
			throw error
		}
	}

	async partRefund<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, orderItem: U, options: PaymentOptions, reason?: string | undefined) {
		
		const stripe = this.stripe()

		const transactionResults = order.transactionResults
		const transactionResult = transactionResults[transactionResults.length - 1]

		const stripeCharge = transactionResult["stripe"] as Stripe.charges.ICharge
		const charegeID = stripeCharge.id
		const idempotency_key = `refund:${orderItem}`

		const data: Stripe.refunds.IRefundCreationOptions = {}
		data.amount = amount
		if (reason) {
			data.reason = reason
		}

		try {
			return await stripe.charges.refund(charegeID, data, {
				idempotency_key: idempotency_key
			})
		} catch (error) {
			throw error
		}
	}

	async transfer<OrderItem extends OrderItemProtocol, Order extends OrderProtocol<OrderItem>, BalanceTransaction extends BalanceTransactionProtocol, Payout extends PayoutProtocol, Account extends AccountProtocol<BalanceTransaction, Payout>>(currency: Currency, amount: number, order: Order, toAccount: Account, options: TransferOptions): Promise<any> {
		
		const stripe = this.stripe()
		
		const idempotency_key = order.id
		const destination = toAccount.accountInformation['stripe']['id']
		const data: Stripe.transfers.ITransferCreationOptions = {
			amount: order.amount,
			currency: order.currency,
			transfer_group: order.id,
			destination: destination
		}

		try {
			const transfer = await stripe.transfers.create(data, {
				idempotency_key: idempotency_key
			})
			return transfer
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	async transferCancel<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, options: TransferOptions, reason?: string | undefined) {
		throw new Error("Method not implemented.");
	}

	async payout(currency: Currency, amount: number, accountID: string, options: PayoutOptions) {
		throw new Error("Method not implemented.");
	}

	async payoutCancel(currency: Currency, amount: number, accountID: string, options: PayoutOptions) {
		throw new Error("Method not implemented.");
	}
}