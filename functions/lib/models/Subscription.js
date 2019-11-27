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
class Subscription extends ballcap_admin_1.Doc {
    constructor() {
        super(...arguments);
        this.shard = tradestore_1.randomShard(tradestore_1.DafaultShardCharacters);
        this.interval = tradestore_1.Interval.month;
        this.intervalCount = 1;
        this.startAt = ballcap_admin_1.FieldValue.serverTimestamp();
        this.cancelAtPeriodEnd = false;
        this.items = [];
        this.status = tradestore_1.SubscriptionStatus.incomplete;
    }
    static collectionReference() {
        return ballcap_admin_1.firestore.collection("commerce/1/subscriptions");
    }
}
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Subscription.prototype, "shard", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Subscription.prototype, "subscribedBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Subscription.prototype, "publishedBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Subscription.prototype, "createdBy", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Subscription.prototype, "interval", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Number)
], Subscription.prototype, "intervalCount", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], Subscription.prototype, "startAt", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], Subscription.prototype, "canceledAt", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Boolean)
], Subscription.prototype, "cancelAtPeriodEnd", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], Subscription.prototype, "endedAt", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Array)
], Subscription.prototype, "items", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", String)
], Subscription.prototype, "status", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], Subscription.prototype, "trial", void 0);
__decorate([
    ballcap_admin_1.Field,
    __metadata("design:type", Object)
], Subscription.prototype, "result", void 0);
exports.Subscription = Subscription;
//# sourceMappingURL=subscription.js.map