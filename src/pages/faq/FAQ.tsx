import React from 'react'
import MobileLayout from '../../components/layout/MobileLayout'
import FAQ_Section from '../../components/UI/FAQ_Section'
import dasomLogo from '../../assets/images/dasomLogo.svg'

const FAQ: React.FC = () => {
  return (
    <MobileLayout>
      <div className='mt-[65px] mb-2 ml-[12px] flex'>
        <img
          className='w-[21px] h-[24px] cursor-pointer'
          alt='logo'
          src={dasomLogo}
        />
        <div className='font-pretendardSemiBold text-white text-[16px] ml-[9px]'>
          <h2 className='text-[16px] font-pretendardBold leading-tight'>
            FAQ / 자주 묻는 질문
          </h2>
          <p className='text-[#A8A8A8] text-[10px] leading-tight'>
            찾으시는 질문이 없다면 다솜 인스타그램 DM 문의를 이용해 주세요.
          </p>
        </div>
      </div>
      <FAQ_Section />
    </MobileLayout>
  )
}

export default FAQ
