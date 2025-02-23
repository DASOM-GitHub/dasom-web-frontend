import React, { JSX, useEffect, useState } from 'react'
import MeetingDate from './MeetingDate'

interface dateInfo {
	month: string
	day: string
	week: string
}

interface interviewPeriod {
	periodStart: string
	periodEnd: string
}

interface props {
	/** 선택된 날짜를 반환하는 콜백 함수 */
	onSelect: (date: string) => void
	/** 면접 기간 */
	period: interviewPeriod
}

/** 면접 날짜 선택 레이아웃 */
const MeetingDateSelector = ({ onSelect, period }: props): JSX.Element => {
	const [selectedDate, setSelectedDate] = useState<string>('')
	const [meetingDates, setMeetingDates] = useState<dateInfo[]>([])
	
	/** 날짜 사이의 일 수 계산 */
	const getDateDiff = (d1: string, d2: string) => {
			const date1 = new Date(d1)
			const date2 = new Date(d2)

			const diffDate = date1.getTime() - date2.getTime()

			return Math.abs(diffDate / (1000 * 60 * 60 * 24))
	}

	// 면접 예약 일자 목록 가져오기
	useEffect(() => {
		const startDate = new Date(period.periodStart)
		const dateArray: dateInfo[] = []

		for (let i = 0; i <= getDateDiff(period.periodStart, period.periodEnd); i++) {
			const date = new Date(startDate)
			date.setDate(startDate.getDate() + i)

			dateArray.push({
				month: (date.getMonth() + 1).toString(),
				day: date.getDate().toString(),
				week: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][date.getDay()],
			})
			/* meetingDates[
				{month: '1', day: '15', week: '수요일'},
				...
			]
			*/
		}
		setMeetingDates(dateArray)
	}, [period])

	/** 날짜 클릭 핸들러 (부모컴포넌트에 state값 반환) */
	const handleDateClick = (date: dateInfo) => {
		const formattedDate = `${date.month}.${date.day} ${date.week}`
		setSelectedDate(formattedDate)
		onSelect(formattedDate)
	}

	return (
		<div className='flex gap-x-5'>
			{meetingDates.map((date, index) => (
				<MeetingDate key={index} {...date} onClick={() => handleDateClick(date)} isSelected={selectedDate === `${date.month}.${date.day} ${date.week}`} />
			))}
		</div>
	)
}

export default MeetingDateSelector
