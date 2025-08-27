import React from 'react'

import instagramIcon from '../../assets/images/instagram.svg'
import githubIcon from '../../assets/images/github.svg'


const IntroSNS: React.FC = () => {
    const SNSdata = {
        'instagram': ['다솜 공식 인스타그램', 'https://www.instagram.com/dasom___official/', instagramIcon],
        'github': ['다솜 공식 Github Organization', 'https://github.com/DASOM-GitHub', githubIcon],
    }

    return (
        <div className='flex flex-col items-end mx-[260px]'>
            <p className='text-white text-6xl font-semibold font-[Pretendard] leading-normal'>
                SNS
            </p>
            <p className='text-white text-2xl font-normal font-[Pretendard] leading-normal text-right'>
                다솜에선 공식 인스타그램, 홈페이지 및 깃허브 Organization을 활용 중이며,<br />이전 기수에서의 스터디나 프로젝트 기록들을 살펴 볼 수 있어요.
            </p>

             <div className="flex flex-row space-x-4 mt-6">
              {Object.entries(SNSdata).map(([key, value]) => (
                <div key={key} >
                    <div>

                    </div>
                    
                    <div className='w-[479px] h-[72px] bg-[#26262D] pt-[17px] pb-[19px] px-[18px]'>
                        <a 
                        href={value[1]} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white text-base font-medium  flex flex-row items-center justify-end"
                        >
                        {value[0]}
                        <div className='w-[22px]'></div>
                        <img src={value[2]}
                         className='w-[40px] h-[40px]'
                         />
                        </a>
                    </div>
                </div>
              ))}
            </div>
        </div>
    )
}

export default IntroSNS