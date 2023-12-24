import { createClient } from '@supabase/supabase-js'

const openmodelsUrl = import.meta.env.VITE_OPENMODELS_URL
const openmodelsAnonKey = import.meta.env.VITE_OPENMODELS_ANON_KEY

export const openmodels = createClient(openmodelsUrl, openmodelsAnonKey)
