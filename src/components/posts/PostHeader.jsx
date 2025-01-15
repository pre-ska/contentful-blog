import ContentfulImage from '@/components/ContentfulImage'
import DateComponent from '@/components/DateComponent'
import Avatar from '@/components/Avatar'

const PostHeader = ({ post }) => {
  const { title, coverImage, author, published } = post

  return (
    <>
      <h2 className='mb-8 md:mb-16 text-2xl md:text-4xl font-bold tracking-tight'>
        {title}
      </h2>
      <div className='hidden md:flex md:justify-between md:items-center md:mb-10'>
        <Avatar name={author?.fields?.name} picture={author?.fields?.picture} />
        <DateComponent
          dateString={published}
          className='text-sm text-gray-400'
        />
      </div>
      <div className='mb-8 md:mb-16 sm:mx-0'>
        <ContentfulImage
          alt={coverImage.fields.title}
          src={coverImage.fields.file.url}
          width={coverImage.fields.file.details.image.width}
          height={coverImage.fields.file.details.image.height}
        />
      </div>
      <div className='flex justify-between items-center md:hidden mb-6'>
        <Avatar name={author.fields.name} picture={author?.fields?.picture} />
        <DateComponent
          dateString={published}
          className='text-sm text-gray-400'
        />
      </div>
    </>
  )
}

export default PostHeader
