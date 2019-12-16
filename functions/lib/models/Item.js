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
class Item extends ballcap_admin_1.Doc {
    constructor() {
        super(...arguments);
        this.isCancelled = false;
        this.isPrivate = false;
    }
    static collectionReference() {
        return ballcap_admin_1.firestore.collection("commerce/1/items");
    }
}
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Boolean)
], Item.prototype, "isCancelled", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Boolean)
], Item.prototype, "isPrivate", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Item.prototype, "passTypeIdentifier", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Item.prototype, "selledBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Item.prototype, "purchasedBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.DocumentReference)
], Item.prototype, "orderReference", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.DocumentReference)
], Item.prototype, "productReference", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.DocumentReference)
], Item.prototype, "skuReference", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.DocumentReference)
], Item.prototype, "stockReference", void 0);
exports.Item = Item;
//# sourceMappingURL=Item.js.map