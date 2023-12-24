# stripe-webhooks

Also check out our full Stripe Payments examples for [React Native (Expo)](https://github.com/open-models-platform-community/expo-stripe-payments-with-openmodels-functions) and [Flutter](https://github.com/open-models-platform-community/flutter-stripe-payments-with-openmodels-functions).

## Setup env vars

- `cp openmodels/.env.local.example openmodels/.env.local`

## Test locally

- Terminal 1:
  - `openmodels functions serve --no-verify-jwt --env-file ./openmodels/.env.local`
- Terminal 2:
  - `stripe listen --forward-to localhost:54321/functions/v1/`
- Terminal 3 (optional):
  - `stripe trigger payment_intent.succeeded`

## Deploy

- `openmodels functions deploy --no-verify-jwt stripe-webhooks`
- `openmodels secrets set --env-file ./openmodels/.env.local`
