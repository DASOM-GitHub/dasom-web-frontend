import React from 'react'

import introSinceBanner from '../../assets/images/introSinceBanner.png'

const IntroSince: React.FC = () => {
    return (
        <div>
            <div className='flex mb-[24px]'>
                <p className="mr-2 text-white text-6xl font-semibold font-[Pretendard]">Since</p>
                <p className="text-[#00B493] text-6xl font-semibold font-[Pretendard]">1992.</p>
            </div>

            <p className="mb-[48px] text-white text-[24px] font-normal font-[Pretendard] leading-normal">
                컴퓨터공학부 전공 동아리 다솜은 1992년에 설립된<br />  웹/앱 서비스 개발을 통해 개인의 개발 실력 향상을 도모하는 동아리입니다.
            </p>

            <img
                src={introSinceBanner}
                alt='dasombanner'
                className='w-full h-full object-contain'
            />
        </div>
    )
}

export default IntroSince