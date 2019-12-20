"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const ballcap_admin_1 = require("@1amageek/ballcap-admin");
const tradestore_1 = require("@1amageek/tradestore");
class BalanceTransaction extends ballcap_admin_1.Doc {
    constructor() {
        super(...arguments);
        this.shard = tradestore_1.randomShard(tradestore_1.DafaultShardCharacters);
        this.type = tradestore_1.BalanceTransactionType.payment;
        this.currency = tradestore_1.Currency.USD;
        this.amount = 0;
        this.transactionResults = [];
    }
    static collectionReference() {
        return ballcap_admin_1.firestore.collection('commerce/1/balanceTransactions');
    }
}
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], BalanceTransaction.prototype, "shard", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], BalanceTransaction.prototype, "type", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], BalanceTransaction.prototype, "currency", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], BalanceTransaction.prototype, "amount", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], BalanceTransaction.prototype, "from", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], BalanceTransaction.prototype, "to", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], BalanceTransaction.prototype, "order", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], BalanceTransaction.prototype, "transfer", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], BalanceTransaction.prototype, "payout", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Array)
], BalanceTransaction.prototype, "transactionResults", void 0);
exports.BalanceTransaction = BalanceTransaction;
//# sourceMappingURL=BalanceTransaction.js.map