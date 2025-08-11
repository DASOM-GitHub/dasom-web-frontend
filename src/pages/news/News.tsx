import React, { useEffect, useState, useRef, useMemo } from 'react'
import MobileLayout from '../../components/layout/MobileLayout'
import dasomLogo from '../../assets/images/dasomLogo.svg'
import NewsContent from '../../components/UI/NewsContent'
import { useNavigate } from 'react-router-dom'
import { NewsItem } from './Newstype'
import { convertToBase64Url } from '../../utils/imageUtils'
import { NewsService } from './NewsService'

const News: React.FC = () => {
  const navigate = useNavigate()
  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const isFetched = useRef(false)

  const fetchNews = async () => {
    try {
      const data = await NewsService.getNewsList()
      setNewsList(data)
    } catch (error) {
      console.error('뉴스 데이터를 불러오는 중 오류 발생:', error)
    }
  }

  useEffect(() => {
    if (!isFetched.current) {
      fetchNews()
      isFetched.current = true
    }
  }, [])

  // `useMemo`로 이미지 변환 최적화 (불필요한 연산 방지)
  const formattedNewsList = useMemo(
    () =>
      newsList.map(news => ({
        ...news,
        imageUrl: convertToBase64Url(news.image),
      })),
    [newsList]
  )

  return (
    <MobileLayout>
      <div className='mt-[65px] mb-2 px-[12px] flex'>
        <img
          className='w-[21px] h-[24px] cursor-pointer'
          alt='logo'
          src={dasomLogo}
        />
        <div className='font-pretendardSemiBold text-white text-[16px] ml-[9px]'>
          다솜 소식
        </div>
      </div>

      <div className='flex flex-col mx-[12px] w-auto mb-40'>
        {formattedNewsList.map(news => (
          <NewsContent
            key={news.id}
            id={news.id}
            title={news.title}
            image={news.imageUrl}
            createdAt={news.createdAt}
            onClick={() => navigate(`/news/${news.id}`)}
          />
        ))}
      </div>
    </MobileLayout>
  )
}

export default News
