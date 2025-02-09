import { useState } from 'react'
import MeetingTime from '../UI/MeetingTime'

interface timeInfo {
	time: string
}

interface props {
	/** 선택된 시간을 반환하는 콜백 함수 */
	onSelect: (time: string) => void
}

/** 면접 시간 목록 */
const meetingTimes: timeInfo[] = [
	{ time: '10:00' },
	{ time: '10:20' },
	{ time: '10:40' },
	{ time: '11:00' },
	{ time: '11:20' },
	{ time: '11:40' },
	{ time: '13:00' },
	{ time: '13:20' },
	{ time: '13:40' },
	{ time: '14:00' },
	{ time: '14:20' },
	{ time: '14:40' },
	{ time: '15:00' },
	{ time: '15:20' },
	{ time: '15:40' },
	{ time: '16:00' },
	{ time: '16:20' },
	{ time: '16:40' },
	{ time: '17:00' },
	{ time: '17:20' },
]

/** 면접 시간 선택 레이아웃 */
const MeetingTimeSelector = ({ onSelect }: props): JSX.Element => {
	const [selectedTime, setSelectedTime] = useState<string>('')

	/** 시간 클릭 핸들러 (부모컴포넌트에 state값 반환) */
	const handleTimeClick = (meetingTime: timeInfo) => {
		const formattedTime = `${meetingTime.time}`
		setSelectedTime(formattedTime)
		onSelect(formattedTime)
	}

	return (
		<div className='grid grid-cols-4 gap-x-2 gap-y-5'>
			{meetingTimes.map((meetingTime, index) => (
				<MeetingTime key={index} {...meetingTime} onClick={() => handleTimeClick(meetingTime)} isSelected={selectedTime === `${meetingTime.time}`} />
			))}
		</div>
	)
}

export default MeetingTimeSelector
