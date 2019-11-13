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
class Account extends ballcap_admin_1.Doc {
    constructor() {
        super(...arguments);
        this.country = "";
        this.isRejected = false;
        this.isSigned = false;
        this.hasLegalEntity = false;
        this.commissionRate = 10;
        this.balance = { available: {}, pending: {} };
        this.accountInformation = {};
        this.metadata = {};
        // SubCollection
        this.balanceTransactions = new ballcap_admin_1.Collection();
        this.payoutRequests = new ballcap_admin_1.Collection();
    }
    parentReference() {
        return ballcap_admin_1.firestore.collection("commerce");
    }
}
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Account.prototype, "stripeID", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Account.prototype, "country", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Boolean)
], Account.prototype, "isRejected", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Boolean)
], Account.prototype, "isSigned", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Boolean)
], Account.prototype, "hasLegalEntity", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], Account.prototype, "commissionRate", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], Account.prototype, "balance", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], Account.prototype, "accountInformation", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Account.prototype, "IPAddress", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], Account.prototype, "metadata", void 0);
__decorate([
    ballcap_admin_1.SubCollection,
    __metadata("design:type", ballcap_admin_1.Collection)
], Account.prototype, "balanceTransactions", void 0);
__decorate([
    ballcap_admin_1.SubCollection,
    __metadata("design:type", ballcap_admin_1.Collection)
], Account.prototype, "payoutRequests", void 0);
exports.Account = Account;
//# sourceMappingURL=Account.js.map