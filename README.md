# firestore-commerce

`firestore-commerce` is a framework that links Firestore and Stripe.
By manipulating the [Ballcap](https://github.com/1amageek/ballcap.ts) data model, you can sell immediately.

## Usage

### Set Stripe API Key

```
firebase functions:config:set stripe.api_key="YOUR_STRIPE_API_KEY"
```

### Quick start

To start selling, first create a `Product` and create a`SKU` or `Plan` in its SubCollection.
`SKU` is an object for selling __Good__, and `Plan` is an object for __Subscription__.

When you save `Product`, `SKU`, `Plan`, an object with the same ID is automatically created.
If an error occurs in Stripe, the data in Firestore is updated with `isAvailable = false`.

### Create Product

When you save `Product`, a Stripe Product with a common ID is automatically created.

```typescript
const user: User = new User("USER_ID")
const product: Product = new Product(user.products.collectionReference.doc())
product.type = "service"
product.name = "test-product"
```

### Create SKU

```typescript
const sku: SKU = new SKU(product.SKUs.collectionReference.doc())
sku.inventory = { type: StockType.finite, quantity: 1 }
sku.currency = Currency.JPY
sku.amount = 1000
```

### Create Plan

```typescript
const plan: Plan = new Plan(product.plans.collectionReference.doc())
plan.interval = Interval.month
plan.intervalCount = 1
plan.currency = Currency.JPY
plan.amount = 1000
plan.isAvailable = true
```

## DB scheme

![DB scheme](https://github.com/1amageek/firestore-commerce/blob/master/DB-scheme.png)

## Test

Create `/test/config.ts` and `secret.json` 

__/test/config.ts__
```
export default {
	stripe: {
		api_key: "",
		customer_id: "",
		cord_id: ""
	}
};
```

__/secret.json__
```
{
	"type": "service_account",
	"project_id": "",
	"private_key_id": "",
	"private_key": "",
	"client_email": "",
	"client_id": "",
	"auth_uri": "",
	"token_uri": "",
	"auth_provider_x509_cert_url": "",
	"client_x509_cert_url": ""
}
```

Run tests
```
npm run test
```
