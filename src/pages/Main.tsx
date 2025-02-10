import React from 'react'
import { Header } from '../components/UI/Header'
import { Cover } from '../components/UI/cover'
import MobileLayout from '../components/layout/MobileLayout'

const Main: React.FC = () => {
  return (
    <MobileLayout>
      <Header/>
      <div className="top-44 text-4xl md:text-[24px] lg:text-[36px] font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 via-neutral-400 to-neutral-300 dark:from-neutral-800 dark:via-white dark:to-white">
        Code Beyond Limits, <br/> Discover <Cover>New Spaces</Cover> with <div className='text-mainColor'>DASOM</div>
      </div>
    </MobileLayout>
  )
}

export default Main