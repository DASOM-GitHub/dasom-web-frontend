import React from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { Header } from '../components/UI/Header'
import { RecruitUI, RecruitHeader } from '../components/UI/RecruitUI'
import { Recruit_InfoBanner } from '../components/UI/Recruit_InfoBanner'

export const RecruitSubmit: React.FC = () => {
  return (
    <MobileLayout>
      <Header />
      <RecruitHeader title="컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 모집 폼" />
      <RecruitUI />
      <Recruit_InfoBanner
        message={`다솜에 지원해주셔서 감사합니다. 
        서류 합격자 명단은 3월 11일 홈페이지 내에서 확인이 가능하며, 
        제출하신 이메일로 추후 다시 한번 안내드리겠습니다.`}
      />
    </MobileLayout>
  )
}