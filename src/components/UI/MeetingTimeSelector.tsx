import React, { JSX, useEffect, useState } from 'react'
import MeetingTime from './MeetingTime'

interface timeInfo {
	time: string
}

interface interviewTime {
	timeStart: string
	timeEnd: string
}

interface props {
	onSelect: (time: string) => void
	time: interviewTime // 면접 시간 
}

const MeetingTimeSelector = ({ onSelect, time }: props): JSX.Element => {
	const [selectedTime, setSelectedTime] = useState<string>('')
	const [meetingTimes, setMeetingTimes] = useState<timeInfo[]>([])

	// 면접 예약 시간 목록 가져오기
	useEffect(()=> {
		//time -> 분으로 변환 
		const parseTime = (timeStr:string):number => {
			const [hours, minutes] = timeStr.split(':').map(Number)
			return hours * 60 + minutes
		}
		// 분(totalMinutes)을 08:00 형식으로 변환 
		const formatTime = (totalMinutes:number):string => {
			const hours = Math.floor(totalMinutes/60)
			const minutes = totalMinutes % 60
			return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`
		}

		const startMinutes = parseTime(time.timeStart)
		const endMinutes = parseTime(time.timeEnd)
		const timeArray: timeInfo[] = []

		// 20분 간격으로 time 추가
		for (let minutes = startMinutes; minutes <= endMinutes; minutes += 20) {
			timeArray.push({time:formatTime(minutes)})
			/*
			meetingTimes[
				{time:'12:00'},
				{time:'12:20'},
				...
			]
			*/
		}

		setMeetingTimes(timeArray)
	},[time])

	// 시간 클릭 핸들러 (부모컴포넌트에 state값 반환)
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
