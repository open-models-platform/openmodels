'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Database } from './database.types'

type MaybeSession = Session | null

type SupabaseContext = {
  openmodels: SupabaseClient<any, string>
  session: MaybeSession
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: MaybeSession
}) {
  const openmodels = createClientComponentClient<Database>()
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = openmodels.auth.onAuthStateChange((_, _session) => {
      if (_session?.access_token !== session?.access_token) {
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, openmodels, session])

  return (
    <Context.Provider value={{ openmodels, session }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = <
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database
>() => {
  let context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }

  return context.openmodels as SupabaseClient<Database, SchemaName>
}

export const useSession = () => {
  let context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSession must be used inside SupabaseProvider')
  }

  return context.session
}
