import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import HeroSection from '../components/sections/HeroSection'
import CoreValuesSection from '../components/sections/CoreValuesSection'

const ActivitiesSection = lazy(() => import('../components/sections/ActivitiesSection'))
const RecruitingSection = lazy(() => import('../components/sections/RecruitingSection'))

type DeferredSectionProps = {
  children: React.ReactNode
  minHeight: number
}

const DeferredSection: React.FC<DeferredSectionProps> = ({ children, minHeight }) => {
  const [shouldRender, setShouldRender] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node || shouldRender) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '200px 0px' }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [shouldRender])

  return (
    <div ref={containerRef}>
      {shouldRender ? (
        <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>
          {children}
        </Suspense>
      ) : (
        <div style={{ minHeight }} aria-hidden="true" />
      )}
    </div>
  )
}

const Main: React.FC = () => {
  return (
    <main className="bg-mainBlack text-white">
      <HeroSection />
      <CoreValuesSection />
      <DeferredSection minHeight={520}>
        <ActivitiesSection />
      </DeferredSection>
      <DeferredSection minHeight={720}>
        <RecruitingSection />
      </DeferredSection>
    </main>
  )
}

export default Main
