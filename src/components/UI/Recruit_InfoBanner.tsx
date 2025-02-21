import React from 'react'

interface Recruit_InfoBannerProps {
  message: string;  
  message2: string;  
}

// 📌 Recruit 공지 컴포넌트
export const Recruit_InfoBanner: React.FC<Recruit_InfoBannerProps> = ({ message, message2 }) => {
  return (
    <div className="w-full max-w-[395px]  p-2 mt-6 text-white text-center text-[14px] font-pretendardBold">
      <div className='max-w[355px] bg-[#00B493] p-1'>
        <p>{message}</p>
        <p>
          {message2.includes('이메일') ? (
            message2.split('이메일').map((part, index) => (
              index === 0 ? (
                <span key={index}>
                  {part}
                  <span className="text-red-600 ">이메일</span>
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            ))
          ) : (
            message2
          )}
        </p>
      </div>
    </div>
  )
}