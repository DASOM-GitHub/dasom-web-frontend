import React, { JSX, useEffect, useState } from 'react'
import MeetingTime from './MeetingTime'

interface timeInfo {
	id: number
	time: string
}

interface interviewTime {
	timeStart: string
	timeEnd: string
}

interface props {
	onSelect: (selectedTime: {id: number, time: string}) => void
	time: interviewTime // 면접 시간 
	disabledSelectTime: boolean
	scheduleId: number[]
}

const MeetingTimeSelector = ({ onSelect, time, disabledSelectTime, scheduleId }: props): JSX.Element => {
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
		let idIndex = 0

		// 20분 간격으로 time 추가, 각 시간별로 고유 ID 부여
		for (let minutes = startMinutes; minutes <= endMinutes; minutes += 20) {
			const id = scheduleId[idIndex]
			timeArray.push({id: id, time:formatTime(minutes)})
			idIndex++
			/*
			meetingTimes[
				{id: 1, time: '12:00'},
				{id: 2, time: '12:20'},
				...
			]
			*/
		}

		setMeetingTimes(timeArray)
	},[time, scheduleId])

	// 시간 클릭 핸들러 (부모컴포넌트에 state값 반환)
	const handleTimeClick = (meetingTime: timeInfo) => {
		setSelectedTime(meetingTime.time)
		onSelect({id: meetingTime.id, time: meetingTime.time})
	}
	useEffect(() => {
		console.log('meetingTimes:', meetingTimes) // 여기서 meetingTimes 배열이 제대로 설정되었는지 확인
	}, [meetingTimes])

	return (	
		<div className='grid grid-cols-4 gap-x-2 gap-y-5'>
			{meetingTimes.map((meetingTime) => (
				<MeetingTime {...meetingTime} onClick={() => handleTimeClick(meetingTime)} isSelected={selectedTime === `${meetingTime.time}`} disabled={disabledSelectTime} />
			))}
		</div>
	)
}

export default MeetingTimeSelector
