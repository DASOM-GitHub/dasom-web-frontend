import React, { useEffect, useState } from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import MeetingDateSelector from '../components/layout/MeetingDateSelector'
import MeetingTimeSelector from '../components/layout/MeetingTimeSelector'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/UI/Header'
import { RecruitHeader, RecruitUI } from '../components/UI/RecruitUI'

/** 면접 날짜 선택 페이지 */
const RecruitMeeting: React.FC = () => {
	const navigate = useNavigate()
	const [selectedDate, setSelectedDate] = useState<string | null>(null)
	const [selectedTime, setSelectedTime] = useState<string | null>(null)
	const [activebtn, setActivebtn] = useState<boolean>(false)

	/** 날짜 선택 핸들러 */
	const handleDateSelect = (date: string) => {
		setSelectedDate(date)
	}

	/** 시간 선택 핸들러 */
	const handleTimeSelect = (time: string) => {
		setSelectedTime(time)
	}

	/** 면접일정 폼 제출 핸들러 */
	const handleSubmit = () => {
		// 선택된 날짜와 시간 state값 전달하여 페이지 이동
		navigate('/recruit-meeting/submit', { state: { date: selectedDate, time: selectedTime } })
	}

	useEffect(() => {
		// 날짜와 시간이 선택되면 버튼 활성화
		selectedDate && selectedTime ? setActivebtn(true) : setActivebtn(false)
	}, [selectedDate, selectedTime])

	return (
		<MobileLayout>
			<RecruitHeader title='컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 모집 폼' />
			<RecruitUI />
			<div className='flex flex-col items-center w-full mb-40'>
				<p className='font-pretendardBold text-white text-center bg-mainColor max-w-[90%] w-full mt-6'>
					1차 서류에 합격되신 점 다시 한번 축하드리며,
					<br />
					편하신 날짜의 시간대를 선택해주시길 바랍니다.
				</p>
				<div className='mt-8 max-w-[90%]'>
					<p className='font-pretendardBold text-white mb-4'>면접일</p>
					<MeetingDateSelector onSelect={handleDateSelect} />
					<p className='font-pretendardBold text-white mt-14 mb-4'>시간</p>
					<MeetingTimeSelector onSelect={handleTimeSelect} />
				</div>
				<button
					className={`font-pretendardBold text-white text-center mt-20 p-1 w-[140px] h-[40px] ${activebtn ? 'bg-mainColor' : 'bg-subGrey3 opacity-30'}`}
					onClick={handleSubmit}
					disabled={!activebtn}>
					면접일정 예약하기
				</button>
			</div>
		</MobileLayout>
	)
}

export default RecruitMeeting
