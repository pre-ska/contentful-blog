import RichText from '../RichText'

const PostBody = ({ post }) => {
  const { content } = post

  return (
    <div className='mx-auto prose'>
      <RichText content={content} />
    </div>
  )
}

export default PostBody
