"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Account_1 = require("../models/Account");
exports.getCustomerID = async (uid) => {
    var _a;
    const account = await Account_1.Account.get(uid);
    if (!account) {
        throw new functions.https.HttpsError('invalid-argument', 'User have not Account');
    }
    const customerID = (_a = account.venders.stripe) === null || _a === void 0 ? void 0 : _a.customerID;
    if (!customerID) {
        throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID');
    }
    return customerID;
};
exports.getCustomerIDFromClaims = async (uid) => {
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