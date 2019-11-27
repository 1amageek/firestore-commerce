import * as admin from 'firebase-admin'
import * as ballcap from '@1amageek/ballcap-admin'
import * as functions from "firebase-functions-test"
import * as Stripe from 'stripe'
import * as index from "../../functions/src/index"
import config from "../config"

const Test = functions({
  databaseURL: 'http://localhost:8080',
  storageBucket: 'my-project.appspot.com',
  projectId: 'my-project',
},
  "./secret.json")

ballcap.initialize(admin.firestore())

import { User } from '../../functions/src/models/User'
import { Product } from '../../functions/src/models/Product'

Test.mockConfig(config);

describe("Firestore triggerd test", () => {
  const stripe = new Stripe(config.stripe.api_key)
  const user: User = new User("test-user")
  const product: Product = new Product(user.products.collectionReference.doc())

  describe("Product test", () => {
    test("onCreate", async () => {
      product.type = "service"
      product.name = "test-product"
      const onCreate = Test.wrap(index.firestore.product.onCreate)
      const snap = Test.firestore.makeDocumentSnapshot(product.data(), product.path)
      await onCreate(snap, {
        auth: {
          uid: 'test-user'
        },
        authType: 'USER'
      })
      const result = await stripe.products.retrieve(product.id)
      expect(result.id).toEqual(product.id)
      expect(result.object).toEqual("product")
      expect(result.active).toEqual(true)
      expect(result.metadata.product_path).toEqual(`commerce/1/users/test-user/products/${product.id}`)
      expect(result.name).toEqual(product.name)
      expect(result.type).toEqual(product.type)
    }, 10000)

    test("onUpdate", async () => {
      const onUpdate = Test.wrap(index.firestore.product.onUpdate)
      const before = Test.firestore.makeDocumentSnapshot(product.data(), product.path)
      product.name = "test-product-update"
      const after = Test.firestore.makeDocumentSnapshot(product.data(), product.path)
      const snap = Test.makeChange(before, after);
      await onUpdate(snap, {
        auth: {
          uid: 'test-user'
        },
        authType: 'USER'
      })
      const result = await stripe.products.retrieve(product.id)
      expect(result.id).toEqual(product.id)
      expect(result.object).toEqual("product")
      expect(result.active).toEqual(true)
      expect(result.metadata.product_path).toEqual(`commerce/1/users/test-user/products/${product.id}`)
      expect(result.name).toEqual(product.name)
      expect(result.type).toEqual(product.type)
    }, 10000)
  })

  afterAll(() => {
    Test.cleanup()
  })
})

