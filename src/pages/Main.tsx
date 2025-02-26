import React, { useState } from 'react'
import { Cover } from '../components/UI/cover'
import MobileLayout from '../components/layout/MobileLayout'
import ActivityStatus from '../components/UI/ActivityStatus'
import dasomInstagram from '../assets/images/instagram.svg'
import dasomGithub from '../assets/images/github.svg'
import { useNavigate } from 'react-router-dom'
import PythonEditor from '../components/UI/PythonEditor'
import ParticlesBackground from '../components/UI/ParticlesBackground'

const Main: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleCodeClick = (index: number) => {
    setSelectedCode(selectedCode === index ? null : index)
  }

  const handleClick = () => {
    navigate('/recruit')
  }

  return (
    <MobileLayout>

      <div className='relative z-10 text-center py-6'>
        <div className='relative inline-block'>
          <ParticlesBackground />
          <div className='top-44 text-4xl md:text-[24px] lg:text-[36px] font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 via-neutral-400 to-neutral-300 dark:from-neutral-800 dark:via-white dark:to-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]'>
            Code Beyond Limits, <br /> Discover <Cover>New Spaces</Cover> with 
            <div className='text-mainColor drop-shadow-[0_4px_10px_rgba(255,255,255,0.2)]'>DASOM</div>
            </div>
        </div>
      </div>
      
      <div className='relative top-[600px] max-w-[351px] mx-auto'>
        <PythonEditor /> 

        <div className='flex w-full bg-stone-900 min-h-[1px] mb-20' />
        <ActivityStatus year="2024" />

        <div className='flex items-center justify-center w-full text-[20px] mt-[20px] font-pretendardBlack text-white text-center cursor-pointer' onClick={handleClick}>
          DASOM 34기 지원하기
        </div>
        <div className='w-[30px] bg-white min-h-[1px] mb-[20px] mt-[48px] mx-auto' />
        <div className='flex items-center justify-center w-full text-[12px] font-pretendardRegular text-white text-center'>
          © 2025 DASOM. ALL RIGHTS RESERVED.
        </div>

        <div className='flex w-full bg-mainBlack min-h-[20px] mb-50' />

        {/* 인스타&깃헙 */}
        <div className='flex w-full justify-center items-center gap-4 mb-20'>
          <a href='https://www.instagram.com/dasom___official/' target='_blank' rel="noopener noreferrer">
            <img src={dasomInstagram} className='w-6 h-6'/>
          </a>
          <a href='https://github.com/DASOM-GitHub' target='_blank' rel="noopener noreferrer">
            <img src={dasomGithub} className='w-6 h-6'/>
          </a>
        </div>

        <div className='flex w-full bg-mainBlack min-h-[60px]' />
      </div>

    </MobileLayout>
  )
}

export default Main