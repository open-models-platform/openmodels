# send-email-smtp

## Deploy

```
openmodels link --project-ref your-project-ref
openmodels secrets set SMTP_HOSTNAME="your.hostname.com" SMTP_PORT="2587" SMTP_USERNAME="your_username" SMTP_PASSWORD="your_password" SMTP_FROM="no-reply@example.com"
openmodels functions deploy send-email-smtp
```

Note: `SMTP_PORT` must be a port other than `25`, `465`, and `587` as Deno Deploy does not support outgoing connections to ports. AWS SES (port 2587) is recommended.

## Test locally

- `cp ./openmodels/.env.local.example ./openmodels/.env.local`
- `openmodels functions serve --env-file ./openmodels/.env.local`
