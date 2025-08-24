import React from 'react'
import { useNavigate } from 'react-router-dom'
import PythonEditor from '../../components/UI/PythonEditor'
import Reveal from '../UI/Reveal'

const RecruitingSection: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-16 md:py-24">
      <Reveal>
      <div className="text-center">
        <p className="text-xl md:text-2xl">Recruiting</p>
        <h2 className="mt-1 text-3xl md:text-4xl font-pretendardBold">모집 일정</h2>
        <p className="mt-4 text-base md:text-xl text-white/80">
          매학기 2-3월, 8-9월경에 신입 부원을 모집하고 있습니다.
          <br className="hidden md:block" />
          다솜 공식 Instagram 계정, 홈페이지, 에브리타임 등에서 모집 일정을 확인할 수 있습니다.
        </p>
      </div>

      <div className="mt-10">
        <PythonEditor />
      </div>

      <div className="mt-16 text-center">
        <p className="text-2xl md:text-3xl font-pretendardBold mb-4">다솜과 함께 도전해보실 당신을 기다립니다.</p>
        <button
          onClick={() => navigate('/recruit')}
          className="inline-flex mt-8 items-center justify-center w-36 h-12 bg-mainColor rounded-[30px] shadow-[2px_6px_11px_0px_rgba(0,0,0,0.25)] font-pretendardSemibold"
        >
          지원하기
        </button>
      </div>
      </Reveal>
    </section>
  )
}

export default RecruitingSection
