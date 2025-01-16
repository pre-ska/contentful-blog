/* eslint-disable @typescript-eslint/no-explicit-any */
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'
import ContentfulImage from '@/components/ContentfulImage'
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal
} from 'react'

const options = {
  renderMark: {
    [MARKS.CODE]: (
      text:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | Promise<
            | string
            | number
            | bigint
            | boolean
            | ReactPortal
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined
          >
        | null
        | undefined
    ) => {
      return (
        <pre>
          <code>{text}</code>
        </pre>
      )
    }
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (
      node: { content: any[] },
      children:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | Promise<
            | string
            | number
            | bigint
            | boolean
            | ReactPortal
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined
          >
        | null
        | undefined
    ) => {
      if (
        node.content.find(item =>
          item.marks?.find((mark: { type: string }) => mark.type === 'code')
        )
      ) {
        return (
          <div>
            <pre>
              <code>{children}</code>
            </pre>
          </div>
        )
      }

      return <p>{children}</p>
    },

    [INLINES.ENTRY_HYPERLINK]: (node: {
      data: {
        target: {
          sys: { contentType: { sys: { id: string } } }
          fields: {
            slug: any
            title:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<unknown, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactPortal
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined
          }
        }
      }
    }) => {
      if (node.data.target.sys.contentType.sys.id === 'post') {
        return (
          <Link href={`/posts/${node.data.target.fields.slug}`}>
            {node.data.target.fields.title}
          </Link>
        )
      }
    },

    [INLINES.HYPERLINK]: (node: {
      content: any[]
      data: { uri: string | undefined }
    }) => {
      const text = node.content.find(item => item.nodeType === 'text')?.value
      return (
        <a href={node.data.uri} target='_blank' rel='noopener noreferrer'>
          {text}
        </a>
      )
    },

    [BLOCKS.EMBEDDED_ENTRY]: (node: {
      data: {
        target: {
          sys: { contentType: { sys: { id: string } } }
          fields: { embedUrl: string | undefined; title: string | undefined }
        }
      }
    }) => {
      if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
        return (
          <iframe
            height='400'
            width='100%'
            src={node.data.target.fields.embedUrl}
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        )
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: (node: {
      data: {
        target: {
          fields: {
            file: { url: any; details: { image: { height: any; width: any } } }
            title: any
          }
        }
      }
    }) => {
      return (
        <ContentfulImage
          src={node.data.target.fields.file.url}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.title}
          className='h-20 w-20'
        />
      )
    }
  }
}

const RichText = ({ content }: { content: any }) => {
  // @ts-expect-error - options
  return <>{documentToReactComponents(content, options)}</>
}

export default RichText
