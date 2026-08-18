import React, { useEffect } from 'react'
import MobileLayout from '../../components/layout/MobileLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  RecruitHeader,
  RecruitUI_SUB,
  RecruitUI_SUB2,
} from '../../components/UI/RecruitUI'
import { Button } from '../../components/UI/Recruit_Button'
import { RecruitCheckState } from './Recruittype'

const RecruitCheck: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { name, isPassed, studentNo, contactLastDigit } =
    location.state as RecruitCheckState

  // 1차 합격시 개인 코드 생성 후 session에 저장
  useEffect(() => {
    if (isPassed) {
      const reservationCode = studentNo + contactLastDigit
      sessionStorage.setItem('reservationCode', reservationCode)
    }
  }, [])

  return (
    <div className='bg-subGrey3' style={{ minHeight: 'calc(100vh - 56px)' }}>
      <MobileLayout>
        <RecruitHeader title='컴퓨터 소프트웨어 공학과 전공 동아리 다솜 35기 합격자 조회' />
        {isPassed ? (
          <RecruitUI_SUB name={name} />
        ) : (
          <RecruitUI_SUB2 name={name} />
        )}
        <div className='mt-5 flex flex-col items-center'>
          {isPassed ? (
            <Button
              text='예약하기'
              onClick={() => {
                navigate('/recruit/meeting')
              }}
            />
          ) : (
            <Button
              text='메인으로 돌아가기'
              onClick={() => {
                navigate('/')
              }}
            />
          )}
        </div>
      </MobileLayout>
    </div>
  )
}

export default RecruitCheck
