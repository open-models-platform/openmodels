import { createClient } from '@supabase/supabase-js'

export const openmodels = createClient(
  process.env.NEXT_PUBLIC_OPENMODELS_URL ?? '',
  process.env.NEXT_PUBLIC_OPENMODELS_ANON_KEY ?? ''
)
