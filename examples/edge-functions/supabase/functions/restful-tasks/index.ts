// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
}

interface Task {
  name: string
  status: number
}

async function getTask(openmodelsClient: SupabaseClient, id: string) {
  const { data: task, error } = await openmodelsClient.from('tasks').select('*').eq('id', id)
  if (error) throw error

  return new Response(JSON.stringify({ task }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function getAllTasks(openmodelsClient: SupabaseClient) {
  const { data: tasks, error } = await openmodelsClient.from('tasks').select('*')
  if (error) throw error

  return new Response(JSON.stringify({ tasks }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function deleteTask(openmodelsClient: SupabaseClient, id: string) {
  const { error } = await openmodelsClient.from('tasks').delete().eq('id', id)
  if (error) throw error

  return new Response(JSON.stringify({}), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function updateTask(openmodelsClient: SupabaseClient, id: string, task: Task) {
  const { error } = await openmodelsClient.from('tasks').update(task).eq('id', id)
  if (error) throw error

  return new Response(JSON.stringify({ task }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function createTask(openmodelsClient: SupabaseClient, task: Task) {
  const { error } = await openmodelsClient.from('tasks').insert(task)
  if (error) throw error

  return new Response(JSON.stringify({ task }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

Deno.serve(async (req) => {
  const { url, method } = req

  // This is needed if you're planning to invoke your function from a browser.
  if (method === 'OPTIONS') {
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

    // For more details on URLPattern, check https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
    const taskPattern = new URLPattern({ pathname: '/restful-tasks/:id' })
    const matchingPath = taskPattern.exec(url)
    const id = matchingPath ? matchingPath.pathname.groups.id : null

    let task = null
    if (method === 'POST' || method === 'PUT') {
      const body = await req.json()
      task = body.task
    }

    // call relevant method based on method and id
    switch (true) {
      case id && method === 'GET':
        return getTask(openmodelsClient, id as string)
      case id && method === 'PUT':
        return updateTask(openmodelsClient, id as string, task)
      case id && method === 'DELETE':
        return deleteTask(openmodelsClient, id as string)
      case method === 'POST':
        return createTask(openmodelsClient, task)
      case method === 'GET':
        return getAllTasks(openmodelsClient)
      default:
        return getAllTasks(openmodelsClient)
    }
  } catch (error) {
    console.error(error)

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
