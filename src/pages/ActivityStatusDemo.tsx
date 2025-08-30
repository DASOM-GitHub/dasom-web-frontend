import React from 'react'
import ActivityStatusExample from '../components/UI/ActivityStatusExample'
import Banner from '../components/common/Banner'
import dasombanner from '../assets/images/dasombanner.png'

const ActivityStatusDemo: React.FC = () => {
  return (
    <main className='w-full bg-[#17171B] flex flex-col items-center pb-20 min-h-screen'>
      <Banner
        imageUrl={dasombanner}
        title="DASOM"
        subtitle="다솜의 최근 활동 연혁입니다."
      />
      <ActivityStatusExample />
    </main>
  )
}

export default ActivityStatusDemo
