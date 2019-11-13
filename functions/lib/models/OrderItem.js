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
class OrderItem extends ballcap_admin_1.Model {
    constructor() {
        super(...arguments);
        this.order = '';
        this.purchasedBy = '';
        this.selledBy = '';
        this.type = tradestore_1.OrderItemType.sku;
        this.quantity = 0;
        this.currency = tradestore_1.Currency.JPY;
        this.amount = 0;
        this.status = tradestore_1.OrderItemStatus.none;
    }
    parentReference() {
        return ballcap_admin_1.firestore.collection("commerce");
    }
}
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], OrderItem.prototype, "name", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.File)
], OrderItem.prototype, "thumbnailImage", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], OrderItem.prototype, "createdBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], OrderItem.prototype, "order", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], OrderItem.prototype, "purchasedBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], OrderItem.prototype, "selledBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], OrderItem.prototype, "type", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.DocumentReference)
], OrderItem.prototype, "productReference", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], OrderItem.prototype, "sku", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], OrderItem.prototype, "currency", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], OrderItem.prototype, "amount", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], OrderItem.prototype, "status", void 0);
exports.OrderItem = OrderItem;
//# sourceMappingURL=OrderItem.js.map