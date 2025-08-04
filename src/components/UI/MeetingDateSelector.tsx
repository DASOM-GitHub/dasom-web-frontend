import React, { JSX, useEffect, useState } from 'react'
import MeetingDate from './MeetingDate'

interface interviewPeriod {
  periodStart: string
  periodEnd: string
}

interface props {
  onSelect: (date: string) => void
  period: interviewPeriod // 면접 기간
}

// 면접 날짜 선택 레이아웃
const MeetingDateSelector = ({ onSelect, period }: props): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [meetingDates, setMeetingDates] = useState<string[]>([])

  // 날짜 사이에 일 수 계산
  const getDateDiff = (d1: string, d2: string) => {
    const date1 = new Date(d1)
    const date2 = new Date(d2)

    const diffDate = date1.getTime() - date2.getTime()

    return Math.abs(diffDate / (1000 * 60 * 60 * 24))
  }

  const getFormattedDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  // 면접 예약 일자 목록 가져오기
  useEffect(() => {
    const startDate = new Date(period.periodStart)
    const dateArray: string[] = []

    for (
      let i = 0;
      i <= getDateDiff(period.periodStart, period.periodEnd);
      i++
    ) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      dateArray.push(getFormattedDate(date))
      /* meetingDates[
				{date: '2025-03-12'},
				...
			]
			*/
    }
    setMeetingDates(dateArray)
  }, [period])

  // 날짜 클릭 핸들러 (상태값 반환용)
  const handleDateClick = (date: string) => {
    setSelectedDate(date)
    onSelect(date)
  }

  return (
    <div className='flex gap-x-5'>
      {meetingDates.map((date, index) => (
        <MeetingDate
          key={index}
          onClick={() => handleDateClick(date)}
          isSelected={selectedDate === date}
          date={date}
        />
      ))}
    </div>
  )
}

export default MeetingDateSelector
