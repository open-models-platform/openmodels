import { openmodels } from '@/lib/initSupabase'
import '@/styles/app.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider openmodelsClient={openmodels}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
