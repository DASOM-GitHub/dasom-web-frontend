import React, { useState, useMemo } from 'react'
import { NewsProps } from './types'

const NewsContent: React.FC<NewsProps> = React.memo(
  ({ title, image, createdAt, content, onClick }) => {
    const [loading, setLoading] = useState(true)

    const formattedDate = useMemo(
      () => new Date(createdAt).toISOString().split('T')[0].replace(/-/g, '.'),
      [createdAt]
    )

    return (
      <div
        className='flex flex-col items-start mb-5 w-full cursor-pointer'
        onClick={onClick}
      >
        {loading && (
          <div className='w-full h-[140px] bg-gray-700 animate-pulse rounded-lg'></div>
        )}

        <img
          src={image || ''}
          className='w-full h-[140px] rounded-t-lg transition-opacity duration-500'
          alt='뉴스 대표 이미지'
          onLoad={() => setLoading(false)}
          loading='lazy'
        />

        <div className='flex flex-col bg-[#26262D] rounded-b-lg w-full px-3 py-3'>
          <h3 className='font-pretendardBold text-white mb-2 truncate'>
            {title}
          </h3>

          {content && (
            <p
              className='font-pretendardRegular text-subGrey mb-3 line-clamp-2 leading-relaxed'
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          <time className='font-pretendardRegular text-subGrey2 self-start'>
            작성일: {formattedDate}
          </time>
        </div>
      </div>
    )
  }
)

export default NewsContent
