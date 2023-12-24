# Open Graph (OG) Image Generation with OpenModels Storage CDN Caching

Generate Open Graph images with Deno and OpenModels Edge Functions and cache the generated image with OpenModels Storage CDN.

- Docs: https://deno.land/x/og_edge@0.0.2
- Examples: https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples
- Demo: https://dev.openmodels.co/functions/v1/lw7-ticket-og?username=thorwebdev

## Run locally

```bash
supabase functions serve --no-verify-jwt
```

Navigate to http://localhost:54321/functions/v1/lw7-ticket-og?username=thorwebdev

## Deploy

```bash
supabase functions deploy lw7-ticket-og --no-verify-jwt
```
