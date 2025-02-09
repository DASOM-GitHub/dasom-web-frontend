import React from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { Header } from '../components/UI/Header'
import dasomLogo from '../assets/images/dasomLogo.svg'

const CoreMembers: React.FC = () => {
  return (
    <div>
      <Header/>
        <div className='relative top-[113px] ml-[12px] flex'>
            <img
                className='w-[21px] h-[24px] cursor-pointer'
                alt="logo"
                src={dasomLogo}
            />
            <div className='font-pretendardSemiBold text-white text-[16px] ml-[9px]'>
                다솜 운영진
            </div>
        </div>
        
        <div>
            
        </div>
    </div>
  )
}

export default CoreMembers