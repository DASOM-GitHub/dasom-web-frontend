import React, { useEffect, useState, useMemo, useRef } from 'react'
import apiClient from '../utils/apiClient'
import { useParams, useNavigate } from 'react-router-dom'
import MobileLayout from '../components/layout/MobileLayout'
import dasomLogo from '../assets/images/dasomLogo.svg'
import NewsContent from '../components/UI/NewsContent'
import NewsNotice from '../components/UI/NewsNotice'

interface NewsDetail {
  id: number
  title: string
  content: string
  images: { encodedData: string; fileFormat: string }[] | null
  createdAt: string
}

const NewsInfo: React.FC = () => {
  const { no } = useParams<{ no: string }>()
  const [news, setNews] = useState<NewsDetail | null>(() => {
    const savedNews = sessionStorage.getItem(`news-${no}`)
    return savedNews ? JSON.parse(savedNews) : null
  })
  const [loading, setLoading] = useState<boolean>(!news)
  const navigate = useNavigate()
  const isFetched = useRef(false)

  const handleNews = () => navigate('/news')

  useEffect(() => {
    if (!no || no === 'undefined' || isFetched.current || news) return

    const fetchNewsDetail = async () => {
      try {
        const response = await apiClient.get(`/news/${no}`)
        const data: NewsDetail = response.data

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

  if (!news && !loading)
    return (
      <p className='text-white text-center mt-5'>뉴스를 찾을 수 없습니다.</p>
    )

  //  이미지 변환 (불필요한 리렌더링 방지)
  const imageUrls = useMemo(() => {
    if (!news?.images) return []
    return news.images.map(img =>
      img.encodedData ? `data:${img.fileFormat};base64,${img.encodedData}` : ''
    )
  }, [news])

  return (
    <MobileLayout>
      <div
        className='mt-[65px] mb-2 ml-[12px] flex cursor-pointer'
        onClick={handleNews}
      >
        <img className='w-[21px] h-[24px]' alt='logo' src={dasomLogo} />
        <div className='font-pretendardSemiBold text-white text-[16px] ml-[9px]'>
          다솜 소식
        </div>
      </div>

      <div className='flex flex-col items-center mx-[12px] mb-40'>
        {loading ? (
          <div className='w-full h-[140px] bg-gray-700 animate-pulse rounded-lg'></div>
        ) : (
          <NewsContent
            id={news!.id}
            title={news!.title}
            images={imageUrls.length > 0 ? news!.images : null}
            createdAt={news!.createdAt}
            onClick={() => {}}
            isDetail={true}
          />
        )}

        {news?.content && <NewsNotice text={news.content} />}
      </div>
    </MobileLayout>
  )
}

export default React.memo(NewsInfo)
