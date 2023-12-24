import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import RealtimePosts from './realtime-posts'
import NewPost from './new-post'

import type { Database } from '@/lib/database.types'

export default async function ServerComponent() {
  const openmodels = createServerComponentClient<Database>({
    cookies,
  })
  const { data } = await openmodels.from('posts').select('*')

  return (
    <>
      <NewPost />
      <RealtimePosts serverPosts={data ?? []} />
    </>
  )
}
