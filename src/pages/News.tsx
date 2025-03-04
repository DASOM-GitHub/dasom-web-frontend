import React, { useEffect, useState, useRef, useMemo } from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import dasomLogo from '../assets/images/dasomLogo.svg'
import NewsContent from '../components/UI/NewsContent'
import { useNavigate } from 'react-router-dom'

interface ImageData {
	encodedData: string
	fileFormat: string
}

interface NewsItem {
	id: number
	title: string
	image: ImageData | null
	createdAt: string
}

const News: React.FC = () => {
	const navigate = useNavigate()
	const [newsList, setNewsList] = useState<NewsItem[]>([])
	const isFetched = useRef(false)

	const fetchNews = async () => {
		try {
			// sessionStorage에서 뉴스 데이터 확인
			const cachedData = sessionStorage.getItem('newsList')
			if (cachedData) {
				setNewsList(JSON.parse(cachedData))
				return
			}

			const response = await fetch('https://dmu-dasom-api.or.kr/api/news')
			if (!response.ok) {
				throw new Error(`API 오류: ${response.status}`)
			}
			const data: NewsItem[] = await response.json()
			console.log('API 응답 데이터:', data)


			const sortedData = data.map(item => ({
				...item,
				no: item.id 
			})).sort((a, b) => b.no - a.no)
			setNewsList(sortedData)
			sessionStorage.setItem('newsList', JSON.stringify(sortedData))
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
			newsList.map((news) => ({
				...news,
				imageUrl:
					news.image && news.image.encodedData
						? `data:${news.image.fileFormat};base64,${news.image.encodedData}`
						: null,
			})),
		[newsList]
	)

	return (
		<MobileLayout>
			<div className='mt-[65px] mb-2 px-[12px] flex'>
				<img className='w-[21px] h-[24px] cursor-pointer' alt='logo' src={dasomLogo} />
				<div className='font-pretendardSemiBold text-white text-[16px] ml-[9px]'>다솜 소식</div>
			</div>

			<div className='flex flex-col mx-[12px] w-auto mb-40'>
				{formattedNewsList.map((news) => (
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
