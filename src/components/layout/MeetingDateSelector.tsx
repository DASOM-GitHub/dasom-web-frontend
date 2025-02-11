import React, { JSX, useState } from 'react'
import MeetingDate from '../UI/MeetingDate'

interface dateInfo {
	month: string
	day: string
	week: string
}

interface props {
	/** 선택된 날짜를 반환하는 콜백 함수 */
	onSelect: (date: string) => void
}

/** 면접 날짜 목록 */
const meetingDates: dateInfo[] = [
	{ month: '3', day: '19', week: '수요일' },
	{ month: '3', day: '20', week: '목요일' },
	{ month: '3', day: '21', week: '금요일' },
]

/** 면접 날짜 선택 레이아웃 */
const MeetingDateSelector = ({ onSelect }: props): JSX.Element => {
	const [selectedDate, setSelectedDate] = useState<string>('')

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
