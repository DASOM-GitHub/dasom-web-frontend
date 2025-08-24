import React, { useEffect, useRef, useState } from 'react'
import CoreValueCard from '../../components/UI/CoreValueCard'

const CoreValuesSection: React.FC = () => {
  const coreValuesRef = useRef<HTMLDivElement | null>(null)
  const [coreBgVisible, setCoreBgVisible] = useState(false)
  const [coreContentVisible, setCoreContentVisible] = useState(false)

  useEffect(() => {
    if (!coreValuesRef.current) return
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    if (!isDesktop) {
      setCoreContentVisible(true)
      return
    }

    const el = coreValuesRef.current
    let timer: number | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCoreBgVisible(true)
            timer = window.setTimeout(() => setCoreContentVisible(true), 1000)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={coreValuesRef} className="relative overflow-hidden">
      <img
        src="/coreback.svg"
        alt=""
        aria-hidden="true"
        className="md:hidden pointer-events-none select-none absolute inset-0 object-cover opacity-70"
        loading="lazy"
        decoding="async"
      />
      <img
        src="/coreback.svg"
        alt=""
        aria-hidden="true"
        className={
          'hidden md:block pointer-events-none select-none absolute inset-0 object-cover ' +
          'transition-[opacity,transform,filter] duration-1000 ease-out ' +
          (coreBgVisible ? 'opacity-70 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm')
        }
        loading="lazy"
        decoding="async"
      />

      <section
        className={
          'relative z-10 max-w-screen-xl mx-auto px-4 py-16 md:py-24 transition-all duration-700 ease-out ' +
          (coreContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')
        }
      >
        <div className="text-center">
          <p className="text-xl md:text-2xl">Core Value</p>
          <h2 className="mt-1 text-3xl md:text-4xl font-pretendardBold">핵심 가치</h2>
          <p className="mt-4 text-base md:text-xl text-white/80">34기 다솜은 이런 분들과 함께 성장하고 싶습니다.</p>
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
            mobileSubtitle="언젠가 진짜를 만들고 싶은 사람"
            mobileBody={
              <>
                아직은 서툴지만 계속 개선하면서
                <br />다솜과 함께 성장해봐요.
              </>
            }
            mobileSubtitleClass="text-sm"
            hoverSubtitle="언젠가 진짜를 만들고 싶은 사람"
            hoverBody={
              <>
                아직은 서툴지만 계속 개선하면서
                <br />다솜과 함께 성장해봐요.
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
    </div>
  )
}

export default CoreValuesSection
