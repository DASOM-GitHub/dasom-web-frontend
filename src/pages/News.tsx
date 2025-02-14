import React from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { Header } from '../components/UI/Header'
import dasomLogo from '../assets/images/dasomLogo.svg'
import NewsContent from '../components/UI/NewsContent'
import { useNavigate } from 'react-router-dom'

interface news {
	id: number // 고유번호
	title: string // 제목
	banner: string | null // 배너 이미지
	date: string // 기간
}

/** 예시 데이터 */
const newsContentExam: news[] = [
	{ id: 1, title: '다솜 34기 신규 부원 모집!', banner: null, date: '2월 25일(화) ~ 3월 14일(금)' },
	{ id: 2, title: '다솜 34기 신규 부원 모집!', banner: null, date: '2월 25일(화) ~ 3월 14일(금)' },
	{ id: 3, title: '다솜 34기 신규 부원 모집!', banner: null, date: '2월 25일(화) ~ 3월 14일(금)' },
	{ id: 4, title: '다솜 34기 신규 부원 모집!', banner: null, date: '2월 25일(화) ~ 3월 14일(금)' },
]

/** 소식 페이지 */
const News: React.FC = () => {
	const navigate = useNavigate()

	// 데이터의 id를 받아와 해당 상세 페이지로 이동
	const handleClick = (id: number) => {
		navigate(`/news/${id}`)
	}

	return (
		<MobileLayout>
			<Header />
			<div className='mt-[65px] mb-2 ml-[12px] flex'>
				<img className='w-[21px] h-[24px] cursor-pointer' alt='logo' src={dasomLogo} />
				<div className='font-pretendardSemiBold text-white text-[16px] ml-[9px]'>다솜 소식</div>
			</div>
			<div className='flex flex-col items-center w-full mb-40'>
				{/* 공지사항 리스트 출력 */}
				{newsContentExam.map((news) => (
					<NewsContent key={news.id} {...news} onClick={() => handleClick(news.id)} />
				))}
			</div>
		</MobileLayout>
	)
}

export default News
