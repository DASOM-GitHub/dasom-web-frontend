import React from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { Header } from '../components/UI/Header'
import dasomLogo from '../assets/images/dasomLogo.svg'
import NewsContent from '../components/UI/NewsContent'

interface news {
	title: string // 제목
	banner: string | null // 배너 이미지
	date: string // 기간
	page: string | null // 이동 할 페이지
}

/** 예시 데이터 */
const newsContentExam: news[] = [
	{ title: '다솜 34기 신규 부원 모집!', banner: dasomLogo, date: '2월 25일(화) ~ 3월 14일(금)', page: null },
	{ title: '다솜 34기 신규 부원 모집!', banner: null, date: '2월 25일(화) ~ 3월 14일(금)', page: null },
	{ title: '다솜 34기 신규 부원 모집!', banner: null, date: '2월 25일(화) ~ 3월 14일(금)', page: null },
	{ title: '다솜 34기 신규 부원 모집!', banner: null, date: '2월 25일(화) ~ 3월 14일(금)', page: null },
	{ title: '다솜 34기 신규 부원 모집!', banner: null, date: '2월 25일(화) ~ 3월 14일(금)', page: null },
]

/** 소식 페이지 */
const News: React.FC = () => {
	return (
		<MobileLayout>
			<Header />
			<div className='mt-[65px] mb-2 ml-[12px] flex'>
				<img className='w-[21px] h-[24px] cursor-pointer' alt='logo' src={dasomLogo} />
				<div className='font-pretendardSemiBold text-white text-[16px] ml-[9px]'>다솜 소식</div>
			</div>
			<div className='flex flex-col items-center w-full mb-40'>
				{/* 공지사항 리스트 출력 */}
				{newsContentExam.map((news, index) => (
					<NewsContent key={index} {...news} />
				))}
			</div>
		</MobileLayout>
	)
}

export default News
