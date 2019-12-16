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
class SKU extends ballcap_admin_1.Doc {
    constructor() {
        super(...arguments);
        this.isAvailable = true;
        this.numberOfFetch = 5;
        this.currency = tradestore_1.Currency.JPY;
        this.amount = 0;
        this.inventory = { type: tradestore_1.StockType.finite, quantity: 1 };
        this.isPrivate = false;
        this.stocks = new ballcap_admin_1.Collection();
    }
    static collectionReference() {
        return ballcap_admin_1.firestore.collection("commerce/1/SKUs");
    }
}
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Boolean)
], SKU.prototype, "isAvailable", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], SKU.prototype, "selledBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], SKU.prototype, "createdBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], SKU.prototype, "numberOfFetch", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], SKU.prototype, "currency", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.DocumentReference)
], SKU.prototype, "productReference", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], SKU.prototype, "name", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], SKU.prototype, "caption", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], SKU.prototype, "amount", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], SKU.prototype, "inventory", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Boolean)
], SKU.prototype, "isPrivate", void 0);
__decorate([
    ballcap_admin_1.SubCollection,
    __metadata("design:type", ballcap_admin_1.Collection)
], SKU.prototype, "stocks", void 0);
exports.SKU = SKU;
//# sourceMappingURL=SKU.js.map
