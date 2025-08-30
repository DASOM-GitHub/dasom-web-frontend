import React from 'react'
import MobileLayout from '../../components/layout/MobileLayout'
import { SomRecruitUI, RecruitHeader } from '../../components/UI/RecruitUI'
import { Recruit_InfoBanner } from '../../components/UI/Recruit_InfoBanner'

const SomkathonSubmit: React.FC = () => {
  return (
    <div className='bg-subGrey3' style={{ minHeight: 'calc(100vh - 56px)' }}>
      <MobileLayout>
        <RecruitHeader title='다솜 해커톤 프로젝트 : 솜커톤 SOMKATHON 모집 폼' />
        <SomRecruitUI />
        <Recruit_InfoBanner
          message={`솜커톤에 지원해주셔서 감사합니다.
                모집 완료 및 인원 집계 후 확정자에 한해 개별 연락드리겠습니다.`}
        />
      </MobileLayout>
    </div>
  )
}

export default SomkathonSubmit
