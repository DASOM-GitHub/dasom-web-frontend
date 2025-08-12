import React from 'react'
import { Recruit_InfoBannerProps } from './types'

// Recruit 공지 컴포넌트
export const Recruit_InfoBanner: React.FC<Recruit_InfoBannerProps> = ({
  message,
}) => {
  return (
    <div className='w-auto  p-2 mt-3 text-white text-center text-[12px]'>
      <div className='w-auto bg-[#00B493] p-1'>
        <p className='whitespace-pre-line font-pretendardRegular'>{message}</p>
      </div>
    </div>
  )
}
