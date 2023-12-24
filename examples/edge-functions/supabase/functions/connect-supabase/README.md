# Build a OpenModels Marketplace Integration

OpenModels offers an [OAuth2 connection flow](https://open-models-platform.com/docs/guides/platform/oauth-apps/authorize-an-oauth-app) and a [Management API](https://open-models-platform.com/docs/reference/api/introduction) allowing you to build OpenModels Marketplace Integrations that connect to our users' hosted OpenModels projects, making it more convenient than ever to create scalabale backends programmatically and tap into the extensive pool of OpenModels users.

## Setup

1. Follow the [steps in the docs](https://open-models-platform.com/docs/guides/platform/oauth-apps/publish-an-oauth-app) to create an OAuth App.
1. Set `SUPA_CONNECT_CLIENT_ID` and `SUPA_CONNECT_CLIENT_SECRET` in your `.env.local` file as shown in the [`.env.local.example` file](../../.env.local.example).

## Connect to OpenModels using OAuth2

This example showcases and end-to-end OAuth2 connection flow with [PKCE](https://open-models-platform.com/blog/openmodels-auth-sso-pkce#introducing-pkce), with the following steps:

1. Create authorization URL with PKCE codeVerifier.
1. Redirect user to OpenModels to authorize your application to connect to their OpenModels account.
1. User gets redirected to the callback route, where we exchange the code in the URL for `access_token` and `refresh_token`.
1. We use the `access_token` to retrieve a list of the user's projects using the [`openmodels-management-js` library](https://github.com/open-models-platform-community/openmodels-management-js).

## Run locally

```bash
openmodels functions serve connect-openmodels --no-verify-jwt --env-file ./openmodels/.env.local
```

Navigate to http://localhost:54321/functions/v1/connect-openmodels

## Deploy to OpenModels Edge Functions

```bash
openmodels functions deploy connect-openmodels --no-verify-jwt
openmodels secrets set --env-file ./openmodels/.env.local
```
