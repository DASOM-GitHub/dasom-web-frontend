import React from 'react'
import { useLocation } from 'react-router-dom'
import MobileLayout from '../../components/layout/MobileLayout'
import { RecruitHeader, RecruitUI } from '../../components/UI/RecruitUI'
import { Recruit_InfoBanner } from '../../components/UI/Recruit_InfoBanner'

const getDisplatyDate = (date: string) => {
  const d = new Date(date)
  const month = (d.getMonth() + 1).toString()
  const day = d.getDate().toString()
  const week = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ][d.getDay()]
  return `${month}.${day} ${week}`
}

const RecruitSubmitMeeting: React.FC = () => {
  const location = useLocation()
  const { date, time } = location.state as { date: string; time: string }

  return (
    <div className='bg-subGrey3' style={{ minHeight: 'calc(100vh - 56px)' }}>
      <MobileLayout>
        <RecruitHeader title='컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 모집 폼' />
        <RecruitUI />
        <Recruit_InfoBanner
          message={`면접일 제출이 완료되었습니다.
			${getDisplatyDate(
        date
      )} ${time} 에 3호관 511호에서 만나뵙겠습니다. 감사합니다.`}
        />
      </MobileLayout>
    </div>
  )
}

export default RecruitSubmitMeeting
