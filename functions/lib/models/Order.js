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
class Order extends ballcap_admin_1.Doc {
    constructor() {
        super(...arguments);
        this.assets = [];
        this.transferredTo = [];
        this.currency = tradestore_1.Currency.JPY;
        this.amount = 0;
        this.items = [];
        this.paymentStatus = tradestore_1.OrderPaymentStatus.none;
        this.transferStatus = tradestore_1.OrderTransferStatus.none;
        this.transactionResults = [];
        this.isCancelled = false;
    }
    parentReference() {
        return ballcap_admin_1.firestore.collection("commerce");
    }
}
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Order.prototype, "parentID", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Order.prototype, "title", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Array)
], Order.prototype, "assets", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Order.prototype, "purchasedBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Order.prototype, "selledBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], Order.prototype, "shippingTo", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Array)
], Order.prototype, "transferredTo", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.Timestamp)
], Order.prototype, "paidAt", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.Timestamp)
], Order.prototype, "expirationDate", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Order.prototype, "currency", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], Order.prototype, "amount", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Order.prototype, "paymentStatus", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Order.prototype, "transferStatus", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Array)
], Order.prototype, "transactionResults", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Boolean)
], Order.prototype, "isCancelled", void 0);
exports.Order = Order;
//# sourceMappingURL=Order.js.map