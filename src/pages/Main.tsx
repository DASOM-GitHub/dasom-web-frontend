import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ParticlesBackground from '../components/UI/ParticlesBackground'
import PythonEditor from '../components/UI/PythonEditor'
import CoreValueCard from '../components/UI/CoreValueCard'

const Main: React.FC = () => {
  const navigate = useNavigate()

  return (
    <main className="bg-mainBlack text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative w-full" style={{ paddingTop: '56%' }}>
          <img
            src="/dasomMain.png"
            alt="hero background"
            className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="w-full max-w-screen-xl mx-auto px-4">
              <ParticlesBackground />
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-pretendardBlack tracking-tight">DASOM</h1>
                <p className="mt-4 text-lg md:text-2xl font-pretendardBold">
                  동양미래대 컴퓨터공학부 전공동아리 다솜
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-screen-xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <p className="text-2xl md:text-2xl">Core Value</p>
          <h2 className="mt-1 text-4xl md:text-4xl font-pretendardBold">핵심 가치</h2>
          <p className="mt-4 text-base md:text-xl text-white/80">
            34기 다솜은 이런 분들과 함께 성장하고 싶습니다.
          </p>
          <p className="mt-4 text-xl md:text-3xl font-pretendardBold">"Dare. Share. Someday."</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          <CoreValueCard
            index="01"
            title="DARE - 도전"
            mobileSubtitle="두려워도 일단 부딪혀보는 사람"
            mobileBody={
              <>
                다솜은 해보는 용기를 응원합니다.
                <br />세션, 해커톤에서 같이 부딪혀요.
              </>
            }
            mobileSubtitleClass="text-sm"
            hoverSubtitle="두려워도 일단 부딪혀보는 사람"
            hoverBody={
              <>
                다솜은 해보는 용기를 응원합니다.
                <br />세션, 해커톤에서 같이 부딪혀요.
              </>
            }
            hoverSubtitleClass="text-2xl"
            titleDefaultClass="text-4xl"
            titleHoverClass="text-4xl"
            imageSrc="/dare.svg"
            mobileImageClass="w-24 h-20 rotate-12 object-contain"
            defaultImageClass="w-32 h-28 md:left-[210px] lg:left-[260px] top-[105px] absolute origin-top-left rotate-[28.12deg] object-contain"
            hoverImageClass="w-32 h-28 md:left-[210px] lg:left-[260px] top-[96px] absolute origin-top-left rotate-[28.12deg] object-contain"
          />

          <CoreValueCard
            index="02"
            title="SHARE - 공유"
            mobileSubtitle="함께 성장하고 싶은 사람"
            mobileBody={
              <>
                다솜만의 스터디, 코드리뷰, 세미나
                <br />다솜에서 공유해봐요.
              </>
            }
            mobileSubtitleClass="text-sm"
            hoverSubtitle="함께 성장하고 싶은 사람"
            hoverBody={
              <>
                다솜만의 스터디, 코드리뷰, 세미나
                <br />다솜에서 공유해봐요.
              </>
            }
            hoverSubtitleClass="text-2xl"
            titleDefaultClass="text-4xl"
            titleHoverClass="text-4xl"
            imageSrc="/share.svg"
            mobileImageClass="w-24 h-20 rotate-12 object-contain"
            defaultImageClass="w-32 h-28 md:left-[210px] lg:left-[260px] top-[105px] absolute origin-top-left rotate-[28.12deg] object-contain"
            hoverImageClass="w-32 h-28 md:left-[210px] lg:left-[260px] top-[96px] absolute origin-top-left rotate-[28.12deg] object-contain"
          />

          <CoreValueCard
            index="03"
            title="SOMEDAY - 미래"
            mobileSubtitle="미래를 설계하고 싶은 사람"
            mobileBody={
              <>
                다솜에서 프로젝트와 경험을 쌓고
                <br />내일의 개발자로 성장해요.
              </>
            }
            mobileSubtitleClass="text-sm"
            hoverSubtitle="미래를 설계하고 싶은 사람"
            hoverBody={
              <>
                다솜에서 프로젝트와 경험을 쌓고
                <br />내일의 개발자로 성장해요.
              </>
            }
            hoverSubtitleClass="text-2xl"
            titleDefaultClass="text-4xl"
            titleHoverClass="text-4xl"
            imageSrc="/someday.svg"
            mobileImageClass="w-24 h-20 rotate-12 object-contain"
            defaultImageClass="w-28 h-32 md:left-[210px] lg:left-[260px] top-[105px] absolute origin-top-left rotate-[28.12deg] object-contain"
            hoverImageClass="w-28 h-32 md:left-[210px] lg:left-[260px] top-[96px] absolute origin-top-left rotate-[28.12deg] object-contain"
          />
        </div>
      </section>

      {/* Activities */}
      <section className="max-w-screen-xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <p className="text-2xl md:text-2xl">Activities</p>
          <h2 className="mt-1 text-4xl md:text-4xl font-pretendardBold">활동 기록</h2>
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

      {/* Recruiting */}
      <section className="max-w-screen-xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <p className="text-2xl md:text-2xl">Recruiting</p>
          <h2 className="mt-1 text-4xl md:text-4xl font-pretendardBold">모집 일정</h2>
          <p className="mt-4 text-base md:text-xl text-white/80">
            매학기 2-3월, 8-9월경에 신입 부원을 모집하고 있습니다.
            <br className="hidden md:block" />
            다솜 공식 Instagram 계정, 홈페이지, 에브리타임 등에서 모집 일정을 확인할 수 있습니다.
          </p>
        </div>

        {/* Editor-like box */}
        <div className="mt-10">
          <PythonEditor />
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-2xl md:text-3xl font-pretendardBold mb-4">다솜과 함께 도전해보실 당신을 기다립니다.</p>
          <button
            onClick={() => navigate('/recruit')}
            className="inline-flex items-center justify-center w-36 h-12 bg-mainColor rounded-[30px] shadow-[2px_6px_11px_0px_rgba(0,0,0,0.25)] font-pretendardSemibold"
          >
            지원하기
          </button>
        </div>
      </section>
    </main>
  )
}

export default Main
