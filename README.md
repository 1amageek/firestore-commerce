# firestore-commerce


## Usage

```
firebase functions:config:set stripe.api_key="YOUR_STRIPE_API_KEY"
```

## DB scheme

![DB scheme](https://github.com/1amageek/firestore-commerce/blob/master/DB-scheme.png)

## Test

Create config.ts.

```
export default {
	stripe: {
		api_key: "",
		customer_id: "",
		cord_id: ""
	}
};
```

Run tests
```
npm run test
```
