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
class SubscriptionItem extends ballcap_admin_1.Model {
    constructor() {
        super(...arguments);
        this.quantity = 0;
        this.taxRates = 0;
        this.amount = 0;
        this.currency = tradestore_1.Currency.JPY;
    }
}
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], SubscriptionItem.prototype, "subscribedBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], SubscriptionItem.prototype, "publishedBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], SubscriptionItem.prototype, "createdBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.DocumentReference)
], SubscriptionItem.prototype, "productReference", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.DocumentReference)
], SubscriptionItem.prototype, "planReference", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], SubscriptionItem.prototype, "quantity", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], SubscriptionItem.prototype, "taxRates", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], SubscriptionItem.prototype, "amount", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], SubscriptionItem.prototype, "currency", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], SubscriptionItem.prototype, "metadata", void 0);
exports.SubscriptionItem = SubscriptionItem;
//# sourceMappingURL=SubscriptionItem.js.map