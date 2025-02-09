import { useState } from 'react'
import MeetingTime from '../UI/MeetingTime'

interface timeInfo {
	hour: string
	minute: string
}

interface props {
	/** 선택된 시간을 반환하는 콜백 함수 */
	onSelect: (time: string) => void
}

/** 면접 시간 목록 */
const meetingTimes: timeInfo[] = [
	{ hour: '10', minute: '00' },
	{ hour: '10', minute: '30' },
	{ hour: '11', minute: '00' },
	{ hour: '11', minute: '30' },
	{ hour: '13', minute: '00' },
	{ hour: '13', minute: '30' },
	{ hour: '14', minute: '00' },
	{ hour: '14', minute: '30' },
	{ hour: '15', minute: '00' },
	{ hour: '15', minute: '30' },
	{ hour: '16', minute: '00' },
	{ hour: '16', minute: '30' },
	{ hour: '17', minute: '00' },
	{ hour: '17', minute: '30' },
]

/** 면접 시간 선택 레이아웃 */
const MeetingTimeSelector = ({ onSelect }: props): JSX.Element => {
	const [selectedTime, setSelectedTime] = useState<string>('')

	/** 시간 클릭 핸들러 (부모컴포넌트에 state값 반환) */
	const handleTimeClick = (time: timeInfo) => {
		const formattedTime = `${time.hour}:${time.minute}`
		setSelectedTime(formattedTime)
		onSelect(formattedTime)
	}

	return (
		<div className='grid grid-cols-4 gap-2'>
			{meetingTimes.map((time, index) => (
				<MeetingTime key={index} {...time} onClick={() => handleTimeClick(time)} isSelected={selectedTime === `${time.hour}:${time.minute}`} />
			))}
		</div>
	)
}

export default MeetingTimeSelector
