import { PaymentDelegate, OrderItemProtocol, OrderProtocol, Currency, BalanceTransactionProtocol, AccountProtocol, PayoutProtocol, TransferOptions, PayoutOptions, PaymentOptions, SubscriptionItemProtocol, SubscriptionProtocol, SubscriptionOptions } from '@1amageek/tradestore';
import * as Stripe from 'stripe';
export declare class StripeController implements PaymentDelegate {
    stripe: Stripe;
    constructor(apiKey: string);
    authorize<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, options: PaymentOptions): Promise<Stripe.charges.ICharge>;
    authorizeCancel<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, options: PaymentOptions): Promise<void>;
    charge<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, options: PaymentOptions): Promise<Stripe.charges.ICharge>;
    subscribe<U extends SubscriptionItemProtocol, T extends SubscriptionProtocol<U>>(subscription: T, options: SubscriptionOptions): Promise<any>;
    refund<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, options: PaymentOptions, reason?: string | undefined): Promise<Stripe.refunds.IRefund>;
    partRefund<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, orderItem: U, options: PaymentOptions, reason?: string | undefined): Promise<Stripe.refunds.IRefund>;
    transfer<OrderItem extends OrderItemProtocol, Order extends OrderProtocol<OrderItem>, BalanceTransaction extends BalanceTransactionProtocol, Payout extends PayoutProtocol, Account extends AccountProtocol<BalanceTransaction, Payout>>(currency: Currency, amount: number, order: Order, toAccount: Account, options: TransferOptions): Promise<any>;
    transferCancel<U extends OrderItemProtocol, T extends OrderProtocol<U>>(currency: Currency, amount: number, order: T, options: TransferOptions, reason?: string | undefined): Promise<void>;
    payout(currency: Currency, amount: number, accountID: string, options: PayoutOptions): Promise<void>;
    payoutCancel(currency: Currency, amount: number, accountID: string, options: PayoutOptions): Promise<void>;
}
