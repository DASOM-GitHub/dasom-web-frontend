import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminPagination from '../../components/UI/AdminPagination'
import axios from 'axios'

interface news {
    id: number;
    title: string;
    createdAt: string;
  }
  
const newsItems: news[] = [
    { id: 1, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 2, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 3, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 4, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 5, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 6, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 7, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 8, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 9, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 10, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 11, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 12, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 13, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 14, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 15, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 16, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 17, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 18, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 19, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-18' },
    { id: 20, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-17' },
    { id: 21, title: '다솜 34기 신규 부원 모집!', createdAt: '2025-02-16' },
]

const ManNewsList: React.FC = () => {
    const navigate = useNavigate()

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 20
    const totalPages = Math.ceil(newsItems.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const visibleNews = newsItems.slice(startIndex, startIndex + itemsPerPage)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dmu-dasom.or.kr/api/news')
                console.log(response.data)
            } catch (err: any) {
                console.error(err)
                const errorCode = err.response?.data?.code
            }
        }
    
        fetchData()
    }, [])

    return (
        <div className='h-[100vh] w-[100vw] bg-mainBlack font-pretendardRegular text-white flex flex-col items-center'>
            <div className='w-[1220px] mt-[155px] mb-[4px]'>
                공지사항 관리
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
                    className='flex p-4 border-b border-gray-600 cursor-pointer hover:bg-gray-900'
                    onClick={() => navigate(`/admin/news/${news.id}`)}
                    >
                        <span className='w-[70px]'>{news.id}</span>
                        <span className='w-[960px]'>{news.title}</span>
                        <span className='text-gray-400 text-[12px]'>{news.createdAt}</span>
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