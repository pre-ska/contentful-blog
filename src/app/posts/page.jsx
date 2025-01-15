import { client } from '@/lib/contentful/client'
import PostCard from './PostCard'
import resolveResponse from 'contentful-resolve-response'

const Posts = async () => {
  const response = await client.getEntries({ content_type: 'post' })
  const posts = resolveResponse(response)

  return (
    <section className='section'>
      <div className='container'>
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10'>
          {(posts || []).map(post => (
            <PostCard key={post.fields.slug} post={post.fields} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Posts
