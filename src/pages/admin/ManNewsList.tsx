import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminPagination from '../../components/UI/AdminPagination'
import axios from 'axios'

interface News {
    id: number
    title: string
    createdAt: string
}

const ManNewsList: React.FC = () => {
    const navigate = useNavigate()
    const [newsItems, setNewsItems] = useState<News[]>([])

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 20
    const totalPages = Math.ceil(newsItems.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const visibleNews = newsItems.slice(startIndex, startIndex + itemsPerPage)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dmu-dasom-api.or.kr/api/news')
                const formattedData = response.data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    createdAt: item.createdAt.split('T')[0],
                })).sort((a: News, b: News) => b.id - a.id)
                console.log(response)
                setNewsItems(formattedData)
            } catch (err: any) {
                console.error(err)
                const errorCode = err.response?.data?.code
            }
        }
    
        fetchData()
    }, [])

    return (
        <div className='h-[100vh] w-[100vw] bg-mainBlack font-pretendardRegular text-white flex flex-col items-center'>
            <div className='flex justify-between w-[1220px] mt-[155px] mb-[4px]'>
                <div className='text-[20px]'>소식 관리</div>
                <div 
                    className='cursor-pointer px-2 py-1 bg-gray-700 text-white rounded-lg'
                    onClick={() => {navigate('/admin/news/post')}}
                >
                    ➕ 새 소식 작성
                </div>
            </div>
            <div className='w-[1220px] bg-gray-800 p-4'>
                {/* 리스트 헤더 */}
                <div className='flex px-4 py-2 border-b border-gray-600 bg-gray-700 font-pretendardSemiBold'>
                    <span className='w-[70px]'>ID</span>
                    <span className='w-[960px]'>제목</span>
                    <span className="text-right">작성일</span>
                </div>

                {/* 공지사항 리스트 */}
                <ul className='overflow-y-auto max-h-[calc(100vh-350px)]'>
                {visibleNews.map((news) => (
                    <li
                        key={news.id}
                        className='flex px-4 pb-3 pt-4 border-b border-gray-600 cursor-pointer hover:bg-gray-900'
                        onClick={() => navigate(`/admin/news/${news.id}`)}
                    >
                        <span className='w-[70px]'>{news.id}</span>
                        <span className='w-[960px]'>{news.title}</span>
                        <span className='text-gray-400 text-[14px]'>{news.createdAt}</span>
                    </li>
                ))}
                </ul>
            </div>
            {/* 페이지네이션 */}
            <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default ManNewsList