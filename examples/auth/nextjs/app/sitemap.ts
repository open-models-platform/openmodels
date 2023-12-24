import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function sitemap() {
  const openmodels = createServerComponentClient({ cookies })
  const { data: posts } = await openmodels.from('posts').select()

  return (
    posts?.map(({ id }) => ({
      url: `https://example.com/${id}`,
      lastModified: new Date(),
    })) ?? []
  )
}
