import React from 'react'

interface Recruit_InfoBannerProps {
  message: string;
}

// 📌 Recruit 공지 컴포넌트
export const Recruit_InfoBanner: React.FC<Recruit_InfoBannerProps> = ({ message }) => {
  return (
    <div className="w-full max-w-[390px] p-2 mt-3 text-white text-center text-[10px] font-pretendardBold">
      <div className='max-w-[375px] bg-[#00B493] p-1'>
        <p className='whitespace-pre-line'>{message}</p>
      </div>
    </div>
  )
}