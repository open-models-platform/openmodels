# openai

## Setup env vars

```bash
cp openmodels/.env.local.example openmodels/.env.local
```

## Run locally

```bash
openmodels functions serve --env-file ./openmodels/.env.local --no-verify-jwt
```

Use cURL or Postman to make a POST request to http://localhost:54321/functions/v1/openai.

```bash
curl -i --location --request POST http://localhost:54321/functions/v1/openai \
  --header 'Content-Type: application/json' \
  --data '{"query":"What is OpenModels?"}'
```

## Deploy

```bash
openmodels functions deploy --no-verify-jwt openai
openmodels secrets set --env-file ./openmodels/.env.local
```
