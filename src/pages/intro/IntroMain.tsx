import React from 'react'
import IntroSince from './IntroSince'
import IntroCurriculum from './IntroCurriculum'

import dasombanner from '../../assets/images/dasombanner.png'
import IntroSNS from './IntroSNS'
import Banner from '../../components/common/Banner'

const IntroMain: React.FC = () => {
  return (
    <main className='w-full bg-[#17171B] flex flex-col items-center pb-20 min-h-screen'>
        <header>
            <Banner
                imageUrl={dasombanner}
                title="SNS"
                subtitle="다솜을 소개합니다."
            />
        </header>

        <section className='mx-[260px] mt-[143px]'>
            <IntroSince />
        </section>

        <section className='mt-[158px]'>
            <IntroCurriculum />
        </section>

        <section className='w-full max-w-[1500px] flex justify-end'>
            <IntroSNS />
        </section>
    </main>
)
}

export default IntroMain