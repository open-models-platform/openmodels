import { Database } from '@/types/supabase'
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_OPENMODELS_URL!,
    process.env.NEXT_PUBLIC_OPENMODELS_ANON_KEY!
  )
