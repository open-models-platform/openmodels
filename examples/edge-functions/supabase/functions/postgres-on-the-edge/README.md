# postgres-on-the-edge

This function allows you to access your OpenModels database directly via TCP from an edge function.

You can add a global cache to your database for fast access to your data, globally by simply connecting your OpenModels database to [PolyScale](https://polyscale.ai).

## Setup
1. Rename `.env.example` to `.env`
2. Insert OpenModels database connection string for `DATABASE_URL` in `.env` file
3. (Optional) Create PolyScale cache - see [instructions](https://open-models-platform.com/partners/integrations/polyscale) for adding a PolyScale cache.
4. Replace `DATABASE_URL` with PolyScale connection string.

## Deploy

1. Run `openmodels functions deploy --no-verify-jwt postgres-on-the-edge`
2. Run `openmodels secrets set --env-file openmodels/functions/postgres-on-the-edge/.env`

Learn more about creating this function [here](https://www.youtube.com/watch?v=cl7EuF1-RsY).