import React, { useState, useEffect } from 'react'
import MobileLayout from '../../components/layout/MobileLayout'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

interface News {
    id: string
    title: string
    content: string
    createdAt: string
    imageUrl?: string
}

const ManNewsDetail: React.FC = () => {
    const { no } = useParams<{ no: string }>()
    const [news, setNews] = useState<News | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get<News>(`https://dmu-dasom.or.kr/api/news/${no}`)
                setNews(response.data)
                console.log(response.data)
            } catch (err) {
                console.error('Error fetching news:', err)
            }
        }
        fetchNews()
    }, [no])

    const handleDelete = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`https://dmu-dasom.or.kr/api/news/${no}`)
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
                        //onClick={}
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
                    <h1>{news?.title}</h1>
                    <p>{news?.createdAt ? new Date(news.createdAt).toLocaleDateString() : ''}</p>
                    {news?.imageUrl && <img src={news.imageUrl} alt={news.title} />}
                    <p>{news?.content}</p>
                </div>
            </MobileLayout>
        </div>
    )
}

export default ManNewsDetail