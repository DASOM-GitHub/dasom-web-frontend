import React, { useEffect, useState, useRef, useMemo } from 'react'
import Banner from '../../components/common/Banner'
import NewsContent from '../../components/UI/NewsContent'
import dasombanner from '../../assets/images/dasombanner.png'
import { useNavigate } from 'react-router-dom'
import { NewsItem } from './Newstype'
import { convertToBase64Url } from '../../utils/imageUtils'
import { getNewsList } from './NewsService'

const News: React.FC = () => {
  const navigate = useNavigate()
  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(9)
  const isFetched = useRef(false)

  const fetchNews = async () => {
    try {
      const data = await getNewsList()
      setNewsList(data)
    } catch (error) {
      console.error('뉴스 데이터 오류 발생:', error)
    }
  }

  useEffect(() => {
    if (!isFetched.current) {
      fetchNews()
      isFetched.current = true
    }
  }, [])

  const formattedNewsList = useMemo(
    () =>
      newsList.map(news => ({
        ...news,
        imageUrl: convertToBase64Url(news.image),
      })),
    [newsList]
  )

  const totalPages = Math.ceil(formattedNewsList.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentNewsList = formattedNewsList.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <main className='w-full bg-[#17171B] flex flex-col items-center pb-20 min-h-screen'>
      <Banner
        imageUrl={dasombanner}
        title="DASOM"
        subtitle="다솜의 최근 활동 사진들을 몰아볼 수 있어요."
      />

      <section className='w-full flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mx-[12px] w-full max-w-6xl mt-[60px] md:mt-[100px] mb-10'>
          {currentNewsList.map(news => (
            <NewsContent
              key={news.id}
              id={news.id}
              title={news.title}
              image={news.imageUrl}
              content={news.content}
              createdAt={news.createdAt}
              onClick={() => navigate(`/activities/news/${news.id}`)}
            />
          ))}
        </div>
      </section>

      {totalPages > 1 && (
        <div className='w-full max-w-screen-xl mx-auto flex flex-col items-center px-4 md:px-12'>
          <div className='w-full h-px bg-gray-600 mb-4 md:mb-6'></div>

          <div className='flex items-center justify-center space-x-1 md:space-x-2 mb-4 md:mb-6'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-white font-pretendardRegular transition-colors duration-200 text-sm md:text-base ${
                  currentPage === page
                    ? 'bg-mainColor text-white'
                    : 'bg-[#26262D] text-white hover:bg-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

export default News
