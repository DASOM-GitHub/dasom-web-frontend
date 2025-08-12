import React, { useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { NewsProps } from './types'

const NewsContent: React.FC<NewsProps> = React.memo(
  ({ id, title, image, images, createdAt, onClick, isDetail = false }) => {
    const [loading, setLoading] = useState(true)

    const formattedDate = useMemo(
      () => new Date(createdAt).toISOString().split('T')[0].replace(/-/g, '.'),
      [createdAt]
    )

    // Base64 → 이미지 URL 변환 (useMemo로 캐싱)
    const imageUrls = useMemo(() => {
      if (!images || images.length === 0) return null
      return images.map(img =>
        img?.encodedData
          ? `data:${img.fileFormat};base64,${img.encodedData}`
          : null
      )
    }, [images])

    return (
      <div
        className='flex flex-col items-start mb-5 w-full cursor-pointer'
        onClick={onClick}
      >
        {loading && (
          <div className='w-full h-[140px] bg-gray-700 animate-pulse rounded-lg'></div>
        )}

        {isDetail && imageUrls ? (
          <Swiper
            key={`swiper-${id}-${imageUrls.length}`}
            spaceBetween={10}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            observer={true}
            observeParents={true}
            modules={[Pagination, Autoplay]}
            className='w-full'
          >
            {imageUrls.map(
              (imageUrl, index) =>
                imageUrl && (
                  <SwiperSlide key={index}>
                    <img
                      src={imageUrl}
                      className='w-full h-[140px] rounded-lg transition-opacity duration-500'
                      alt={`뉴스 이미지 ${index + 1}`}
                      onLoad={() => setLoading(false)}
                      loading='lazy'
                    />
                  </SwiperSlide>
                )
            )}
          </Swiper>
        ) : (
          image && (
            <img
              src={image}
              className='w-full h-[140px] rounded-lg transition-opacity duration-500'
              alt='뉴스 대표 이미지'
              onLoad={() => setLoading(false)}
              loading='lazy'
            />
          )
        )}
        <p className='font-pretendardBold text-white text-[16px] mt-2'>
          {title}
        </p>
        <p className='text-[12px] text-subGrey2'>작성일: {formattedDate}</p>
      </div>
    )
  }
)

export default NewsContent
