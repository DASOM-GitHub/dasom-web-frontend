import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { NewsDetail } from './Newstype'
import { convertMultipleToBase64Urls } from '../../utils/imageUtils'
import { getNewsDetail } from './NewsService'
import NewsCarousel from '../../components/UI/NewsCarousel'

const NewsInfo: React.FC = () => {
  const { no } = useParams<{ no: string }>()
  const [news, setNews] = useState<NewsDetail | null>(() => {
    const savedNews = sessionStorage.getItem(`news-${no}`)
    return savedNews ? JSON.parse(savedNews) : null
  })
  const [loading, setLoading] = useState<boolean>(!news)
  const navigate = useNavigate()
  const isFetched = useRef(false)

  const handleNews = () => navigate('/activities/news')

  const imageUrls = useMemo(() => {
    if (!news?.images) return []

    const convertedUrls = convertMultipleToBase64Urls(news.images)
    return convertedUrls
  }, [news?.images])

  useEffect(() => {
    if (!no || no === 'undefined' || isFetched.current || news) return

    const fetchNewsDetail = async () => {
      try {
        const data = await getNewsDetail(no)
        setNews(data)
        sessionStorage.setItem(`news-${no}`, JSON.stringify(data))
      } catch (error) {
        console.error('API 요청 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNewsDetail()
    isFetched.current = true
  }, [no, news])

  if (loading) {
    return (
      <main className='w-full bg-[#17171B] flex flex-col items-center justify-center min-h-screen'>
        <section className='text-center'>
          <p className='text-white'>로딩 중...</p>
        </section>
      </main>
    )
  }

  if (!news && !loading)
    return (
      <main className='w-full bg-[#17171B] flex flex-col items-center justify-center min-h-screen'>
        <section className='text-center'>
          <p className='text-white mt-5'>뉴스를 찾을 수 없습니다.</p>
        </section>
      </main>
    )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}.${String(date.getDate()).padStart(2, '0')}`
  }

  return (
    <main className='w-full bg-[#17171B] flex flex-col items-center pb-20 min-h-screen'>
      {imageUrls.length > 0 && (
        <section className='w-full'>
          <NewsCarousel imageUrls={imageUrls} />
        </section>
      )}

      <article className='w-full max-w-6xl mx-auto mt-8'>
        <section className='p-6 md:p-8 shadow-xl'>
          <header className='mb-6'>
            <h1 className='text-white text-xl md:text-2xl font-pretendardBold'>
              {news?.title}
            </h1>
          </header>

          <section className='mb-6'>
            <div
              className='text-white font-pretendardRegular md:text-base leading-relaxed'
              dangerouslySetInnerHTML={{ __html: news?.content || '' }}
            />
          </section>

          <div className='text-right'>
            <time className='text-subGrey2 font-pretendardRegular'>
              작성일: {news?.createdAt ? formatDate(news.createdAt) : ''}
            </time>
          </div>
        </section>
      </article>

      <nav className='w-full flex justify-center mt-4'>
        <button
          onClick={handleNews}
          className='bg-[#00B493] hover:bg-[#009A7E] text-white px-6 py-3 rounded-lg font-pretendardRegular transition-colors shadow-lg hover:shadow-xl'
        >
          목록으로
        </button>
      </nav>
    </main>
  )
}

export default React.memo(NewsInfo)
