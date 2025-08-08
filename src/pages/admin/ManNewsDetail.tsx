import React, { useState, useEffect } from 'react'
import MobileLayout from '../../components/layout/MobileLayout'
import { useParams, useNavigate } from 'react-router-dom'
import apiClient from '../../utils/apiClient'

interface Image {
  id: number
  fileFormat: string
  encodedData: string
}

interface News {
  id: string
  title: string
  content: string
  createdAt: string
  images: Image[]
}

const ManNewsDetail: React.FC = () => {
  const { no } = useParams<{ no: string }>()
  const [news, setNews] = useState<News | null>(null)
  const [images, setImages] = useState<Image[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await apiClient.get<News>(`/news/${no}`)
        setNews(response.data)
        setImages(response.data.images)
        //console.log(response.data)
      } catch (err) {
        console.error('Error fetching news:', err)
      }
    }
    fetchNews()
  }, [no])

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await apiClient.delete(`/news/${no}`)
        alert('삭제되었습니다.')
        navigate('/admin/news') // 삭제 후 목록 페이지로 이동
      } catch (err) {
        console.error('Error deleting news:', err)
        alert('삭제에 실패했습니다.')
      }
    }
  }

  return (
    <div className='h-[100vh] w-[100vw] bg-mainBlack font-pretendardRegular text-white flex flex-col items-center'>
      <MobileLayout>
        <div className='mt-[80px] mb-[20px] mr-[20px] flex justify-end'>
          <div
            className='cursor-pointer border border-gray-600 px-2 py-1 rounded-[6px] bg-gray-800 hover:bg-gray-900 mr-[8px]'
            onClick={() => navigate(`/admin/news/edit/${no}`)}
          >
            수정
          </div>
          <div
            className='cursor-pointer border border-gray-600 px-2 py-1 rounded-[6px] bg-gray-800 hover:bg-gray-900'
            onClick={handleDelete}
          >
            삭제
          </div>
        </div>

        <div>
          <div>{news?.title}</div>
          <div>
            {news?.createdAt
              ? new Date(news.createdAt).toLocaleDateString()
              : ''}
          </div>
          {Array.isArray(images) && images.length > 0 ? ( // 이미지가 있을 때만 렌더링
            images.map(image => (
              <div key={image.id} className='flex items-center'>
                <img
                  src={`data:${image.fileFormat};base64,${image.encodedData}`}
                  alt={`image-${image.id}`}
                  className='w-max h-auto object-cover'
                />
              </div>
            ))
          ) : (
            <div className='text-[14px]'>업로드된 파일이 없습니다.</div>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: news?.content || '',
            }}
          />
        </div>
      </MobileLayout>
    </div>
  )
}

export default ManNewsDetail
