import React, { useState } from 'react'
import { NewsCarouselProps } from './types'

const NewsCarousel: React.FC<NewsCarouselProps> = ({ imageUrls }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % imageUrls.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (imageUrls.length === 0) return null

  return (
    <header className='flex flex-col w-full'>
      <div className='w-full px-2 sm:px-4 py-4 sm:py-8'>
        <div className='relative w-full max-w-6xl mx-auto mb-4 sm:mb-6'>
          <div className='relative overflow-hidden rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl'>
            <img
              src={imageUrls[currentSlide]}
              alt={`뉴스 이미지 ${currentSlide + 1}`}
              className='w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover object-center transform scale-100 transition-transform duration-300 hover:scale-105'
              style={{
                imageRendering: 'crisp-edges',
              }}
              onError={e => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>

          {imageUrls.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className='absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white text-lg sm:text-2xl w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm'
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className='absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white text-lg sm:text-2xl w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm'
              >
                →
              </button>
            </>
          )}
        </div>

        {imageUrls.length > 1 && (
          <div className='w-full max-w-6xl mx-auto'>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 sm:gap-2 md:gap-4'>
              {imageUrls.map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative overflow-hidden rounded-md sm:rounded-lg transition-all duration-300 shadow-md sm:shadow-lg ${
                    currentSlide === index
                      ? 'ring-2 ring-teal-400 scale-105 shadow-lg sm:shadow-xl'
                      : 'hover:scale-105 hover:shadow-lg sm:hover:shadow-xl'
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={`썸네일 ${index + 1}`}
                    className='w-full h-12 sm:h-16 md:h-20 lg:h-24 object-cover object-center'
                    style={{
                      imageRendering: 'crisp-edges',
                    }}
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default NewsCarousel
