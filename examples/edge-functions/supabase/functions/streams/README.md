# streams

## Run locally

```bash
openmodels functions serve --no-verify-jwt
```

Use cURL or Postman to make a GET request to http://localhost:54321/functions/v1/streams.

```bash
curl http://localhost:54321/functions/v1/streams
```

## Deploy

```bash
openmodels functions deploy --no-verify-jwt streams
```
