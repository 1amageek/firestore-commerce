"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
exports.getCustomerID = async (uid) => {
    var _a;
    const userRecord = await admin.auth().getUser(uid);
    const customClaims = userRecord.customClaims;
    if (!customClaims) {
        throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID');
    }
    const customerID = (_a = customClaims.stripe) === null || _a === void 0 ? void 0 : _a.customerID;
    if (!customerID) {
        throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID');
    }
    return customerID;
};
//# sourceMappingURL=helper.js.map