import ContentfulImage from '@/components/ContentfulImage'
import Avatar from '@/components/Avatar'
import DateComponent from '@/components/DateComponent'
import Link from 'next/link'

import React from 'react'

const PostCard = ({ post }) => {
  const { title, slug, excerpt, coverImage, author, published } = post

  return (
    <li className='rounded-md overflow-hidden shadow-md flex flex-col'>
      <Link
        href={`/posts/${slug}`}
        aria-label={title}
        className='flex-1 flex flex-col'
      >
        <div className='mb-2'>
          <ContentfulImage
            alt={`Cover Image for ${title}`}
            src={coverImage.fields.file.url}
            width={coverImage.fields.file.details.image.width}
            height={coverImage.fields.file.details.image.height}
          />
        </div>
        <div className='p-4 flex flex-1 flex-col'>
          <h3 className='text-xl mb-1 leading-snug'>{title}</h3>
          <div className='text-sm mb-4 text-gray-400'>
            <DateComponent dateString={published} />
          </div>
          <p className='text-base mb-4 flex-1'>{excerpt}</p>
          <Avatar name={author.fields.name} picture={author.fields.picture} />
        </div>
      </Link>
    </li>
  )
}

export default PostCard
