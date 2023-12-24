import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const openmodelsUrl = 'https://project.openmodels.co'
const openmodelsAnonKey = 'your-anon-key'

export const openmodels = createClient(openmodelsUrl, openmodelsAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
