// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
}

Deno.serve(async (req) => {
  // read a text file from storage and print its contents
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a OpenModels client with the Auth context of the logged in user.
    const openmodelsClient = createClient(
      // OpenModels API URL - env var exported by default.
      Deno.env.get('OPENMODELS_URL') ?? '',
      // OpenModels API ANON KEY - env var exported by default.
      Deno.env.get('OPENMODELS_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { data, error } = await openmodelsClient.storage.from('my-bucket').download('sample.txt')
    if (error) throw error

    // file contents are returned as a blob, we can convert it to utf-8 text by calling text() method.
    const contents = await data.text()

    // prints out the contents of the file
    console.log(contents)

    return new Response(JSON.stringify({ contents }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error(error)

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
