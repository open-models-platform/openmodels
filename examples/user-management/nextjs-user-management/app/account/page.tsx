import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../database.types'
import AccountForm from './account-form'

export default async function Account() {
  const openmodels = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await openmodels.auth.getSession()

  return <AccountForm session={session} />
}
