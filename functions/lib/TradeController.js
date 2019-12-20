"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = require("./models/Item");
const User_1 = require("./models/User");
class TradeController {
    reserve(order, orderItem, transaction) {
        return;
    }
    createItem(order, orderItem, stockReference, transaction) {
        const purchaser = new User_1.User(order.purchasedBy);
        const item = new Item_1.Item(purchaser.items.collectionReference.doc());
        item.selledBy = orderItem.selledBy;
        item.orderReference = order.documentReference;
        item.productReference = orderItem.productReference;
        item.skuReference = orderItem.skuReference;
        item.stockReference = stockReference;
        transaction.set(purchaser.items.collectionReference.doc(item.id), item.data(), { merge: true });
        return item.documentReference;
    }
    cancelItem(order, orderItem, item, transaction) {
        transaction.set(item, {
            isCancelled: true
        }, { merge: true });
    }
    async getItems(order, orderItem, transaction) {
        const purchaser = new User_1.User(order.purchasedBy);
        const query = purchaser.items.collectionReference.where('orderReference', '==', order.documentReference);
        const items = await transaction.get(query);
        return items;
    }
}
exports.TradeController = TradeController;
//# sourceMappingURL=TradeController.js.map