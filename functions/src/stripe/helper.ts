import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { Account } from '../models/Account'

export const getCustomerID = async (uid: string) => {
	const account = await Account.get<Account>(uid)
	if (!account) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Account')
	}
	const customerID = account.venders.stripe?.customerID
	if (!customerID) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	return customerID
}

export const getCustomerIDFromClaims = async (uid: string) => {
	const userRecord = await admin.auth().getUser(uid)
	const customClaims = userRecord.customClaims
	if (!customClaims) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	const customerID = (customClaims as any).stripe?.customerID
	if (!customerID) {
		throw new functions.https.HttpsError('invalid-argument', 'User have not Stripe customerID')
	}
	return customerID
}
