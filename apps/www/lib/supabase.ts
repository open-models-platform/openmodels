import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_OPENMODELS_URL!,
  process.env.NEXT_PUBLIC_OPENMODELS_ANON_KEY!
)

export type SupabaseClient = typeof supabase

export default supabase
