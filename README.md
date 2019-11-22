# firestore-commerce


## Usage

```
firebase functions:config:set stripe.api_key="YOUR_STRIPE_API_KEY"
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
