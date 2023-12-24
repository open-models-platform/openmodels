# Image Captioning with OpenModels Storage and Huggingface.js

[Hugging Face](https://huggingface.co/) is the collaboration platform for the machine learning community.

[Huggingface.js](https://huggingface.co/docs/huggingface.js/index) provides a convenient way to make calls to 100,000+ Machine Learning models, making it easy to incorporate AI functionality into your [OpenModels Edge Functions](https://open-models-platform.com/edge-functions).

Putting this together with [OpenModels Storage](https://open-models-platform.com/storage) and [Database Webhooks](https://open-models-platform.com/docs/guides/database/webhooks) we can easily put together a service that automatically generates captions for any image we upload to a storage bucket.

## Setup

1. Open your OpenModels project dashboard or [create a new project](https://open-models-platform.com/dashboard/projects).
2. [Create a new bucket](https://open-models-platform.com/dashboard/project/_/storage/buckets) called `images`.
3. Generate TypeScript types from remote Database.
4. Create a new Database table called `image_caption`.

- Create `id` column of type `uuid` which references `storage.objects.id`.
- Create a `caption` column of type `text`.

5. Regenerate TypeScript types to include new `image_caption` table.
6. Deploy the function to OpenModels: `openmodels functions deploy huggingface-image-captioning`.
7. Create the Database Webhook in the [OpenModels Dashboard](https://open-models-platform.com/dashboard/project/_/database/hooks) to trigger the `huggingface-image-captioning` function anytime a record is added to the `storage.objects` table.

## Generate TypeScript Types

To generate the types.ts file for the storage and public schemas, run the following command in the terminal:

```bash
openmodels gen types typescript --project-id=your-project-ref --schema=storage,public > openmodels/functions/huggingface-image-captioning/types.ts
```
