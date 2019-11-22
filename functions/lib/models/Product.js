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
class Product extends ballcap_admin_1.Doc {
    constructor() {
        super(...arguments);
        this.SKUs = new ballcap_admin_1.Collection();
        this.plans = new ballcap_admin_1.Collection();
    }
    static collectionReference() {
        return ballcap_admin_1.firestore.collection("commerce/1/products");
    }
}
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], Product.prototype, "metadata", void 0);
__decorate([
    ballcap_admin_1.SubCollection,
    __metadata("design:type", ballcap_admin_1.Collection)
], Product.prototype, "SKUs", void 0);
__decorate([
    ballcap_admin_1.SubCollection,
    __metadata("design:type", ballcap_admin_1.Collection)
], Product.prototype, "plans", void 0);
exports.Product = Product;
//# sourceMappingURL=Product.js.map