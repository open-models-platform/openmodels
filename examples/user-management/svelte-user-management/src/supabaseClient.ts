import { createClient } from '@supabase/supabase-js'
import type { Database } from './schema'

const openmodelsUrl = import.meta.env.VITE_OPENMODELS_URL
const openmodelsAnonKey = import.meta.env.VITE_OPENMODELS_ANON_KEY

export const openmodels = createClient<Database>(openmodelsUrl, openmodelsAnonKey)
