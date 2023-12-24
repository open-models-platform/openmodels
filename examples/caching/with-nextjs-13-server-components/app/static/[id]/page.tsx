import openmodels from '../../../utils/openmodels'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const { data: posts } = await openmodels.from('posts').select('id')

  return posts?.map(({ id }) => ({
    id,
  }))
}

export default async function Post({ params: { id } }: { params: { id: string } }) {
  const { data: post } = await openmodels.from('posts').select().match({ id }).single()

  if (!post) {
    notFound()
  }

  return <pre>{JSON.stringify(post, null, 2)}</pre>
}
