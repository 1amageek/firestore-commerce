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
class Plan extends ballcap_admin_1.Doc {
    constructor() {
        super(...arguments);
        this.currency = tradestore_1.Currency.JPY;
        this.amount = 0;
        this.interval = tradestore_1.Interval.month;
        this.intervalCount = 1;
        this.isAvailable = true;
        this.subscriptions = new ballcap_admin_1.Collection();
    }
    static collectionReference() {
        return ballcap_admin_1.firestore.collection('commerce/1/plans');
    }
}
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Plan.prototype, "publishedBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Plan.prototype, "createdBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.DocumentReference)
], Plan.prototype, "productReference", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Plan.prototype, "name", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Plan.prototype, "currency", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], Plan.prototype, "amount", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Plan.prototype, "interval", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], Plan.prototype, "intervalCount", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Array)
], Plan.prototype, "tiers", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Plan.prototype, "tiersMode", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", ballcap_admin_1.Timestamp)
], Plan.prototype, "trialPeriodDays", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Boolean)
], Plan.prototype, "isAvailable", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], Plan.prototype, "metadata", void 0);
__decorate([
    ballcap_admin_1.SubCollection,
    __metadata("design:type", ballcap_admin_1.Collection)
], Plan.prototype, "subscriptions", void 0);
exports.Plan = Plan;
//# sourceMappingURL=Plan.js.map