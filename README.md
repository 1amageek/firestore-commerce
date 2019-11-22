# firestore-commerce


## Usage

```
firebase functions:config:set stripe.api_key="YOUR_STRIPE_API_KEY"
```

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
