import * as admin from 'firebase-admin'
import * as ballcap from '@1amageek/ballcap-admin'
import * as functions from "firebase-functions-test"
import * as index from "../functions/src/index"
import config from "./config"

const Test = functions({
	databaseURL: 'http://localhost:8080',
	storageBucket: 'my-project.appspot.com',
	projectId: 'my-project',
  },
  "./secret.json")

ballcap.initialize(admin.firestore())

Test.mockConfig(config);
const createAccount = Test.wrap(index.createAccount)


describe("Collection", () => {

	test("CollectionReference", async () => {
		const a = await createAccount({
			country: "JP",
		}, {
			auth: {
				uid: "test-user"
			}
		})
		console.log(a)
	}, 10000)


	afterAll(() => {
		Test.cleanup()
	})
})