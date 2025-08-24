import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { NewsItem } from '../../pages/news/Newstype'
import { NewsService } from '../../pages/news/NewsService'
import { convertToBase64Url } from '../../utils/imageUtils'

const ActivitiesSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const fetched = useRef(false)

  useEffect(() => {
    if (fetched.current) return
    const load = async () => {
      try {
        const list = await NewsService.getNewsList()
        setNews(list)
      } catch (e) {
        console.error('최근 소식 불러오기 실패:', e)
      }
    }
    load()
    fetched.current = true
  }, [])

  const latestThree = useMemo(() => {
    const top3 = news.slice(0, 3)
    return top3.map(n => ({
      ...n,
      imageUrl: convertToBase64Url(n.image),
    }))
  }, [news])

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <p className="text-xl md:text-2xl">Activities</p>
        <h2 className="mt-1 text-3xl md:text-4xl font-pretendardBold">활동 기록</h2>
        <p className="mt-4 text-base md:text-xl text-white/80">
          튜터링, 스터디뿐만 아니라 팀 프로젝트, 솜커톤과 같은 대내 행사를 진행하고 있습니다.
          <br className="hidden md:block" />
          이뿐만 아니라 외부 세미나 참여, EXPO 출품, MT, 할로윈 파티 등 다양한 행사 또한 진행하고 있습니다.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestThree.map(item => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className="rounded-3xl bg-neutral-100 text-zinc-900 overflow-hidden border border-zinc-900/10 hover:shadow-md transition-shadow"
          >
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover" />
            ) : (
              <div className="w-full h-36 bg-zinc-200 flex items-center justify-center text-zinc-500 text-sm">이미지 없음</div>
            )}
            <div className="p-5">
              <h3 className="text-xl font-pretendardBold line-clamp-2">{item.title}</h3>
              <p className="mt-3 text-xs text-zinc-500">{new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
        {latestThree.length === 0 && (
          <div className="col-span-full text-center text-white/70">최근 소식을 불러오는 중입니다...</div>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/news" className="px-6 py-3 rounded-[30px] bg-mainColor shadow-[2px_6px_11px_0px_rgba(0,0,0,0.25)] font-pretendardSemibold">
          더 알아보기
        </Link>
      </div>
    </section>
  )
}

export default ActivitiesSection
