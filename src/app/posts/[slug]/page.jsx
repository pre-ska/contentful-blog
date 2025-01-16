import resolveResponse from 'contentful-resolve-response'

import PostBody from '@/components/posts/PostBody'
import PostHeader from '@/components/posts/PostHeader'
// import PreviewAlert from '@/components/ui/PreviewAlert'
import { client, previewClient } from '@/lib/contentful/client'

export const dynamic = 'force-static'

const Post = async ({ params }) => {
  const { slug, preview = false } = await params
  console.log('params', { slug, preview })
  const cfClient = preview ? previewClient : client

  const response = await cfClient.getEntries({
    content_type: 'post',
    'fields.slug': slug
  })

  if (!response?.items?.length) {
    return {
      redirect: {
        destination: '/posts',
        permanent: false
      }
    }
  }

  const post = resolveResponse(response)

  return (
    <section className='section'>
      {preview && <PreviewAlert />}
      <div className='container'>
        <article className='prose mx-auto max-w-none'>
          <PostHeader post={post[0].fields} />
          <PostBody post={post[0].fields} />
        </article>
      </div>
    </section>
  )
}

export const generateStaticParams = async () => {
  const response = await client.getEntries({ content_type: 'post' })

  return response.items.map(item => ({
    slug: item.fields.slug
  }))
}

export default Post
