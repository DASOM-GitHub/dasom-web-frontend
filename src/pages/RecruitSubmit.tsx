import React from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { Header } from '../components/UI/Header'
import { RecruitUI, RecruitHeader } from '../components/UI/RecruitUI'
import { InputField } from '../components/UI/Recruit_InputField'
import { Recruit_InfoBanner } from '../components/UI/Recruit_InfoBanner'

export const RecruitSubmit: React.FC = () => {
  return (
    <MobileLayout>
      <Header />
      <RecruitHeader title="컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 모집 폼" />
      <RecruitUI />
      <Recruit_InfoBanner
        message="다솜에 지원해주셔서 감사합니다."
        date="서류 합격자 명단은 3월 15일 이메일로 일괄 공지됩니다."
      />
    </MobileLayout>
  )
}

