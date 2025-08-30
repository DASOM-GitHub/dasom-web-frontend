import React from 'react'
import instagramIcon from '../../assets/images/instagram.svg'
import githubIcon from '../../assets/images/github.svg'

const IntroSNS: React.FC = () => {
    const SNSdata = {
        'instagram': ['다솜 공식 인스타그램', 'https://www.instagram.com/dasom___official/', instagramIcon],
        'github': ['다솜 공식 Github Organization', 'https://github.com/DASOM-GitHub', githubIcon],
    }

    return (
        <div className='px-4'>
            <div className='flex flex-col py-8 items-end'>
                <p className='w-full text-right text-white text-4xl md:text-5xl lg:text-6xl font-pretendardSemiBold leading-normal'>
                    SNS
                </p>
                <p className='text-white text-lg md:text-xl lg:text-2xl font-pretendardRegular leading-normal text-right'>
                    다솜에선 공식 인스타그램, 홈페이지 및 깃허브 Organization을 활용 중이며,<br />이전 기수에서의 스터디나 프로젝트 기록들을 살펴 볼 수 있어요.
                </p>

                <div className="flex flex-col space-y-4 mt-6 md:space-x-4 md:flex-row md:space-y-0" >
                    {Object.entries(SNSdata).map(([key, value]) => (
                        <div key={key}>
                            <div className='bg-[#26262D] w-[calc(100vw-150px)] md:w-[479px] h-[72px] pt-[17px] pb-[19px] px-[18px]'>
                                <a 
                                    href={value[1]} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex flex-row items-center justify-between"
                                >
                                    <p className='text-white  text-sm lg:text-base font-pretendardSemiBold '>{value[0]}</p>
                                    <div className='w-[22px]'></div>
                                    <img 
                                        src={value[2]} 
                                        alt={value[0]}
                                        className='w-[40px] h-[40px]'
                                    />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default IntroSNS