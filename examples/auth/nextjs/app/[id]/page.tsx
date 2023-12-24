import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { notFound, redirect } from 'next/navigation'
import RealtimePost from './realtime-post'
import { cookies } from 'next/headers'

import type { Database } from '@/lib/database.types'

export default async function Post({ params: { id } }: { params: { id: string } }) {
  const openmodels = createServerComponentClient<Database>({
    cookies,
  })

  const {
    data: { session },
  } = await openmodels.auth.getSession()

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/')
  }

  const { data: post } = await openmodels.from('posts').select().match({ id }).single()

  if (!post) {
    notFound()
  }

  return <RealtimePost serverPost={post} />
}
