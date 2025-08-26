import { useNavigate } from 'react-router-dom'
import FAQSection from '../../components/UI/FAQ_Section'
import { RecruitInfo_Button } from '../../components/UI/RecruitInfo_Button'
import React, { useEffect, useState } from 'react'
import RecruitCalendar from '../../components/UI/RecruitCalendar'
import { useRecruitSchedule } from './useRecruitSchedule'

const RecruitInfo: React.FC = () => {
  const navigate = useNavigate()
  const { loadSchedule } = useRecruitSchedule()
  const [periodData, setPeriodData] = useState({
    recruitmentPeriodStart: '',
    recruitmentPeriodEnd: '',
    interviewPeriodStart: '',
    interviewPeriodEnd: '',
    interviewPassAnnouncement: '',
  })

  const formatMmDd = (dateStr: string) => {
    if (!dateStr) return ''
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr)
    if (match) {
      return `${match[2]}월 ${match[3]}일`
    }
    return dateStr
  }

  // 모집 기간 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { scheduleData } = await loadSchedule()
        setPeriodData({
          recruitmentPeriodStart: scheduleData.recruitmentPeriodStart,
          recruitmentPeriodEnd: scheduleData.recruitmentPeriodEnd,
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

  return (
    <div className='flex flex-col items-center w-full max-w-full min-h-screen overflow-x-hidden bg-mainBlack text-white pb-20'>
      {/* Title Section */}
      <div className='flex flex-col w-full px-5 sm:px-10 md:px-20 font-pretendardBold gap-48 mt-20 mb-6 text-5xl sm:text-7xl md:text-8xl'>
        <div>
          <p>DASOM</p>
          <p className='text-lg'>"Dare, Share. Someday."</p>
        </div>
        <p className='text-right'>34th</p>
      </div>
      <RecruitInfo_Button
        text='34기 지원하기'
        onClick={() => navigate('/recruit')}
      />

      {/* Schedule Section */}
      <div className='flex flex-col mt-96 w-[90%] items-center font-pretendardRegular overflow-x-hidden'>
        <p className='font-pretendardBold text-4xl'>34기 모집일정</p>
        <div className='my-10'>
          {periodData.recruitmentPeriodStart &&
          periodData.recruitmentPeriodEnd ? (
            <RecruitCalendar
              periods={[
                {
                  start: periodData.recruitmentPeriodStart,
                  end: periodData.recruitmentPeriodEnd,
                },
              ]}
              interviewPeriods={
                periodData.interviewPeriodStart && periodData.interviewPeriodEnd
                  ? [
                      {
                        start: periodData.interviewPeriodStart,
                        end: periodData.interviewPeriodEnd,
                      },
                    ]
                  : []
              }
              passDates={
                periodData.interviewPassAnnouncement
                  ? [periodData.interviewPassAnnouncement]
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
            <span className='font-pretendardBold'>4. 다솜 2학기 OT</span> 09월
            19일
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