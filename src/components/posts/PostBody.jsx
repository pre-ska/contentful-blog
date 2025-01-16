import RichText from '../RichText'

const PostBody = ({ post }) => {
  const { content } = post

  return (
    <div className='mx-auto prose max-w-[120ch]'>
      <RichText content={content} />
    </div>
  )
}

export default PostBody
