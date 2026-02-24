import { useNavigate } from 'react-router-dom'
import FAQSection from '../../components/UI/FAQ_Section'
import { RecruitInfo_Button } from '../../components/UI/RecruitInfo_Button'
import React, { useEffect, useState } from 'react'
import RecruitCalendar from '../../components/UI/RecruitCalendar'
import { useRecruitSchedule } from './useRecruitSchedule'
import { formatDate } from './useRecruitSchedule'

const RecruitInfo: React.FC = () => {
  const FIRST_GENERATION_YEAR = 1992 // 다솜 1기 1992년 기준

  const currentYear = new Date().getFullYear() // 현재 년도 계산
  const currentGeneration = currentYear - FIRST_GENERATION_YEAR + 1 // 현재 기수 계산

  const navigate = useNavigate()
  const { loadSchedule } = useRecruitSchedule()
  const [periodData, setPeriodData] = useState({
    recruitmentPeriodStart: '',
    recruitmentPeriodEnd: '',
    documentPassAnnouncement: '',
    interviewPeriodStart: '',
    interviewPeriodEnd: '',
    interviewPassAnnouncement: '',
  })
  const [buttonState, setButtonState] = useState({
    text: '',
    disabled: false,
    onClick: () => navigate('/recruit'),
  })

  const formatMmDd = (dateStr: string) => {
    if (!dateStr) return ''
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr)
    if (match) {
      return `${match[2]}월 ${match[3]}일`
    }
    return dateStr
  }

  const determineRecruitStatus = () => {
    const now = new Date()
    const {
      recruitmentPeriodStart,
      recruitmentPeriodEnd,
      documentPassAnnouncement,
      interviewPassAnnouncement,
    } = periodData

    if (!recruitmentPeriodStart || !recruitmentPeriodEnd) {
      return {
        text: '모집 일정 준비 중',
        disabled: true,
        onClick: () => {},
      }
    }

    const startDate = new Date(recruitmentPeriodStart)
    const endDate = new Date(recruitmentPeriodEnd)
    const docPassDate = documentPassAnnouncement
      ? new Date(documentPassAnnouncement)
      : null
    const interviewPassDate = interviewPassAnnouncement
      ? new Date(interviewPassAnnouncement)
      : null

    let status: 'before' | 'recruiting' | 'docPass' | 'interviewPass' | 'ended'

    if (now < startDate) {
      status = 'before'
    } else if (now >= startDate && now <= endDate) {
      status = 'recruiting'
    } else if (docPassDate && now >= endDate && now < docPassDate) {
      status = 'docPass'
    } else if (
      interviewPassDate &&
      now >= docPassDate! &&
      now < interviewPassDate
    ) {
      status = 'interviewPass'
    } else {
      status = 'ended'
    }

    switch (status) {
      case 'before':
        const daysUntilStart = Math.ceil(
          (startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        )
        return {
          text: `모집 시작까지 ${daysUntilStart}일 남음`,
          disabled: true,
          onClick: () => {},
        }

      case 'recruiting':
        return {
          text: `${currentGeneration}기 지원하기`,
          disabled: false,
          onClick: () => navigate('/recruit'),
        }

      case 'docPass':
        return {
          text: '1차 합격 발표',
          disabled: false,
          onClick: () => navigate('/recruit/result'),
        }

      case 'interviewPass':
        return {
          text: '최종 합격 발표',
          disabled: false,
          onClick: () => navigate('/recruit/result'),
        }

      case 'ended':
        return {
          text: '지원 결과 확인하기',
          disabled: false,
          onClick: () => navigate('/recruit/result'),
        }

      default:
        return {
          text: '모집 일정 준비 중',
          disabled: true,
          onClick: () => {},
        }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { scheduleData } = await loadSchedule()
        setPeriodData({
          recruitmentPeriodStart: scheduleData.recruitmentPeriodStart,
          recruitmentPeriodEnd: scheduleData.recruitmentPeriodEnd,
          documentPassAnnouncement: scheduleData.documentPassAnnouncement,
          interviewPeriodStart: scheduleData.interviewPeriodStart,
          interviewPeriodEnd: scheduleData.interviewPeriodEnd,
          interviewPassAnnouncement: scheduleData.interviewPassAnnouncement,
        })
      } catch (error) {
        console.error('Error fetching recruit configs:', error)
      }
    }

    fetchData()
  }, [loadSchedule])

  useEffect(() => {
    const newButtonState = determineRecruitStatus()
    setButtonState(newButtonState)
  }, [periodData, navigate])

  return (
    <div className='flex flex-col items-center w-full max-w-full min-h-screen overflow-x-hidden bg-mainBlack text-white pb-20'>
      {/* Title Section */}
      <div className='flex flex-col w-full px-5 sm:px-10 md:px-20 font-pretendardBold gap-48 mt-20 mb-6 text-5xl sm:text-7xl md:text-8xl'>
        <div>
          <p>DASOM</p>
          <p className='text-lg'>"Dare, Share. Someday."</p>
        </div>
        <p className='text-right'>{currentGeneration}th</p>
      </div>
      <RecruitInfo_Button
        text={buttonState.text}
        onClick={buttonState.onClick}
        disabled={buttonState.disabled}
      />

      {/* Schedule Section */}
      <div className='flex flex-col mt-96 w-[90%] items-center font-pretendardRegular overflow-x-hidden'>
        <p className='font-pretendardBold text-4xl'>{currentGeneration}기 모집일정</p>
        <div className='my-10'>
          {periodData.recruitmentPeriodStart &&
          periodData.recruitmentPeriodEnd ? (
            <RecruitCalendar
              periods={[
                {
                  start: formatDate(periodData.recruitmentPeriodStart),
                  end: formatDate(periodData.recruitmentPeriodEnd),
                },
              ]}
              interviewPeriods={
                periodData.interviewPeriodStart && periodData.interviewPeriodEnd
                  ? [
                      {
                        start: formatDate(periodData.interviewPeriodStart),
                        end: formatDate(periodData.interviewPeriodEnd),
                      },
                    ]
                  : []
              }
              passDates={
                periodData.interviewPassAnnouncement
                  ? [formatDate(periodData.interviewPassAnnouncement)]
                  : []
              }
              colors={{
                recruit: 'bg-mainColor text-white',
                interview: 'bg-mainColor/50 text-white',
                pass: 'bg-mainColor/25 text-white',
              }}
              months={2}
            />
          ) : null}
        </div>
        <div className='flex flex-col items-center text-lg gap-2'>
          <p>
            <span className='font-pretendardBold'>1. 서류모집</span>{' '}
            {formatMmDd(periodData.recruitmentPeriodStart)} ~{' '}
            {formatMmDd(periodData.recruitmentPeriodEnd)}
          </p>
          <p>
            <span className='font-pretendardBold'>2. 면접일정</span>{' '}
            {formatMmDd(periodData.interviewPeriodStart)} ~{' '}
            {formatMmDd(periodData.interviewPeriodEnd)}
          </p>
          <p>
            <span className='font-pretendardBold'>3. 최종 합격자 발표</span>{' '}
            {formatMmDd(periodData.interviewPassAnnouncement)}
          </p>
          <p>
            <span className='font-pretendardBold'>4. 다솜 1학기 OT</span> 03월 20일
          </p>
        </div>
        <p className='mt-6 text-base text-subGrey2'>
          일정은 매 기수 변동될 수 있습니다.
        </p>
      </div>

      {/* FAQ Section */}
      <div className='flex flex-col items-start mt-64 w-[80%]'>
        <div className='mr-auto'>
          <h2 className='text-2xl font-pretendardBold leading-tight'>
            FAQ / 자주 묻는 질문
          </h2>
          <p className='text-[#A8A8A8] text-sm leading-tight font-pretendardRegular'>
            찾으시는 질문이 없다면 다솜 인스타그램 DM 문의를 이용해 주세요.
          </p>
        </div>
        <FAQSection />
      </div>
    </div>
  )
}

export default RecruitInfo
