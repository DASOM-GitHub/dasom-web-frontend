import { useState, useCallback } from 'react'
import { fetchRecruitConfigs } from './RecruitService'
import { RecruitConfigItem } from './Recruittype'

// 날짜를 'M월 D일(요일)'로 포맷하는 유틸 함수
export const formatKoreanDate = (dateStr?: string): string => {
  if (!dateStr) return ''

  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr)
  let d: Date | null = null

  if (m) {
    const y = Number(m[1])
    const mo = Number(m[2]) - 1
    const dd = Number(m[3])
    d = new Date(y, mo, dd)
  } else {
    const tmp = new Date(dateStr)
    d = isNaN(tmp.getTime()) ? null : tmp
  }

  if (!d) return ''

  const weekdayKr = ['일', '월', '화', '수', '목', '금', '토']
  return `${d.getMonth() + 1}월 ${d.getDate()}일(${weekdayKr[d.getDay()]})`
}

// 날짜를 YYYY-MM-DD 형식으로 변환하는 유틸 함수
export const formatDate = (dateStr?: string): string => {
  if (!dateStr) return ''

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// 모집 일정 데이터 타입 정의
export interface RecruitScheduleData {
  recruitmentPeriodStart: string // YYYY-MM-DD
  recruitmentPeriodEnd: string // YYYY-MM-DD
  documentPassAnnouncement: string // YYYY-MM-DD
  interviewPeriodStart: string // YYYY-MM-DD
  interviewPeriodEnd: string // YYYY-MM-DD
  interviewTimeStart: string // HH:MM:SS
  interviewTimeEnd: string // HH:MM:SS
  interviewPassAnnouncement: string // YYYY-MM-DD
}

// 모집 일정 조회 및 처리를 담당하는 훅
export const useRecruitSchedule = () => {
  const [isRecruiting, setIsRecruiting] = useState<boolean | null>(null)
  const [scheduleData, setScheduleData] = useState<RecruitScheduleData | null>(
    null
  )

  const loadSchedule = useCallback(async (): Promise<{
    isRecruiting: boolean
    data: RecruitConfigItem[]
    scheduleData: RecruitScheduleData
  }> => {
    try {
      const data = await fetchRecruitConfigs()

      // 모집 기간 확인
      const recruitmentStart = data.find(
        item => item.key === 'RECRUITMENT_PERIOD_START'
      )?.value
      const recruitmentEnd = data.find(
        item => item.key === 'RECRUITMENT_PERIOD_END'
      )?.value

      const startDate = new Date(recruitmentStart as string)
      const endDate = new Date(recruitmentEnd as string)
      const now = new Date()

      const isRecruitingNow = now >= startDate && now <= endDate

      if (isRecruitingNow) {
        setIsRecruiting(true)
      } else {
        setIsRecruiting(false)
      }

      // 모든 모집 일정 데이터 정리
      const scheduleData: RecruitScheduleData = {
        recruitmentPeriodStart:
          data.find(item => item.key === 'RECRUITMENT_PERIOD_START')?.value || '',
        recruitmentPeriodEnd:
          data.find(item => item.key === 'RECRUITMENT_PERIOD_END')?.value || '',
        documentPassAnnouncement:
          data.find(item => item.key === 'DOCUMENT_PASS_ANNOUNCEMENT')?.value || '',
        interviewPeriodStart:
          data.find(item => item.key === 'INTERVIEW_PERIOD_START')?.value || '',
        interviewPeriodEnd:
          data.find(item => item.key === 'INTERVIEW_PERIOD_END')?.value || '',
        interviewTimeStart:
          data.find(item => item.key === 'INTERVIEW_TIME_START')?.value || '',
        interviewTimeEnd:
          data.find(item => item.key === 'INTERVIEW_TIME_END')?.value || '',
        interviewPassAnnouncement:
          data.find(item => item.key === 'INTERVIEW_PASS_ANNOUNCEMENT')?.value || '',
      }

      setScheduleData(scheduleData)

      return { isRecruiting: isRecruitingNow, data, scheduleData }
    } catch (error) {
      console.error('모집 일정 조회 중 오류 발생:', error)
      setIsRecruiting(false)
      throw error
    }
  }, [])

  return {
    isRecruiting,
    scheduleData,
    loadSchedule,
  }
}
