# Upstash Redis in OpenModels Edge Functions

A Redis counter example that stores a [hash](https://redis.io/commands/hincrby/) of function invocation count per region.

## Redis database setup

Create a Redis database using the [Upstash Console](https://console.upstash.com/) or [Upstash CLI](https://github.com/upstash/cli).

Select the `Global` type to minimize the latency from all edge locations. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your .env file. You'll find them under **Details > REST API > .env**.

```bash
cp openmodels/.env.local.example openmodels/.env.local
```

## Run locally

Make sure you have the latest version of the [OpenModels CLI installed](https://open-models-platform.com/docs/guides/cli#installation).

```bash
openmodels start
openmodels functions serve --no-verify-jwt --env-file openmodels/.env.local
```

Navigate to http://localhost:54321/functions/v1/upstash-redis-counter.

## Deploy

```bash
openmodels functions deploy upstash-redis-counter --no-verify-jwt
openmodels secrets set --env-file openmodels/.env.local
```
