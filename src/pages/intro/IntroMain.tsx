import React from 'react'
import IntroSince from './IntroSince'
import IntroCurriculum from './IntroCurriculum'

import dasombanner from '../../assets/images/dasombanner.png'
import IntroSNS from './IntroSNS'
import Banner from '../../components/common/Banner'

const IntroMain: React.FC = () => {
  return (
    <main className='w-full bg-[#17171B] flex flex-col items-center pb-20 min-h-screen'>
        <Banner
                imageUrl={dasombanner}
                title="SNS"
                subtitle="다솜을 소개합니다."
            />
        <div className='w-full max-w-screen-xl px-4'>
            <section className=' mt-[143px]'>
                <IntroSince />
            </section>

            <section className='mt-[158px]'>
                <IntroCurriculum />
            </section>

            <section className='w-full'>
                <IntroSNS />
            </section>
        </div>
    </main>
)
}

export default IntroMain