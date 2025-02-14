import React, { JSX, useEffect, useState } from 'react'
import defaultBanner from '../../assets/images/newsBannerExam.svg'

interface news {
	title: string
	banner: string | null
	date: string
}

/** 공지사항 컴포넌트 */
const NewsContent = ({ title, banner, date }: news): JSX.Element => {
	const [src, setSrc] = useState<string>(defaultBanner) // 기본 배너 이미지

	// 배너 이미지 있을 경우 src 변경
	useEffect(() => {
		if (banner) {
			setSrc(banner)
		}
	}, [banner])

	return (
		<div className='mb-5 w-[90%]'>
			{/* 배너 이미지 */}
			<img className='w-[350px] h-[140px]' src={src} />
			{/* 제목 */}
			<p className='font-pretendardBold text-white text-[20px]'>{title}</p>
			{/* 날짜 */}
			<p className='font-pretendardRegular text-[12px] text-subGrey2'>{date}</p>
		</div>
	)
}

export default NewsContent
