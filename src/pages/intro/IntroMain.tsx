import React from 'react'
import IntroSince from './IntroSince'
import IntroCurriculum from './IntroCurriculum'

import dasomintrobanner from '../../assets/images/dasomIntroBanner.png'
import IntroSNS from './IntroSNS'

const IntroMain: React.FC = () => {
  return (
    <main className='w-full bg-[#17171B] flex flex-col items-center pb-20 min-h-screen'>
        <header>
            <img
                src={dasomintrobanner}
                alt='dasombanner'
                className='w-full h-full object-contain'
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