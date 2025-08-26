import React from 'react'
import HeroSection from '../components/sections/HeroSection'
import CoreValuesSection from '../components/sections/CoreValuesSection'
import ActivitiesSection from '../components/sections/ActivitiesSection'
import RecruitingSection from '../components/sections/RecruitingSection'

const Main: React.FC = () => {
  return (
    <main className="bg-mainBlack text-white">
      <HeroSection />
      <CoreValuesSection />
      <ActivitiesSection />
      <RecruitingSection />
    </main>
  )
}

export default Main
