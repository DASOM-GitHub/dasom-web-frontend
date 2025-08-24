import React from 'react'
import { Link } from 'react-router-dom'

const ActivitiesSection: React.FC = () => {
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
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-3xl bg-neutral-100 text-zinc-900 overflow-hidden border border-zinc-900/10">
            <img src="https://placehold.co/378x142" alt="activity" className="w-full h-36 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-pretendardBold">💬 GDGoC Konkuk Kprintf 2025</h3>
              <p className="mt-3 text-sm leading-6">
                5월 24일, 건국대학교에서 열린 GDGoC 프로그램 Kprintf 2025에 다녀왔습니다!
                현직 개발자 선배님들께서 대학생 개발자들을 위해 자신의 경험을 바탕으로 다양한 조언과 인사이트를 나누어 주는 자리였습니다...
              </p>
            </div>
          </div>
        ))}
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
