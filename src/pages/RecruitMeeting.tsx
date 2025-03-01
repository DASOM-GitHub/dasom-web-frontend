import React, { useEffect, useState } from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import MeetingDateSelector from '../components/UI/MeetingDateSelector'
import MeetingTimeSelector from '../components/UI/MeetingTimeSelector'
import { useNavigate } from 'react-router-dom'
import { RecruitHeader, RecruitUI } from '../components/UI/RecruitUI'
import { Button } from '../components/UI/Recruit_Button'
import { Recruit_InfoBanner } from '../components/UI/Recruit_InfoBanner'
import axios from 'axios'

interface recruitData {
	key: string
	value: string
}

interface interviewPeriod {
	periodStart: string
	periodEnd: string
}

interface interviewTime {
	timeStart: string
	timeEnd: string
}

const RecruitMeeting: React.FC = () => {
	const navigate = useNavigate()
	// 면접 일정 데이터
	const [interviewPeriodData, setInterviewPeriodData] = useState<interviewPeriod>({
		periodStart: '',
		periodEnd: '',
	})
	const [interviewTimeData, setInterviewTimeData] = useState<interviewTime>({
		timeStart: '',
		timeEnd: '',
	})
	const [selectedDate, setSelectedDate] = useState<string | null>(null)
	const [selectedTime, setSelectedTime] = useState<string | null>(null)
	const [activebtn, setActivebtn] = useState<boolean>(false)

	// 날짜 선택 핸들러 
	const handleDateSelect = (date: string) => {
		setSelectedDate(date)
	}

	// 시간 선택 핸들러 
	const handleTimeSelect = (time: string) => {
		setSelectedTime(time)
	}

	// 면접 일정 폼 제출 핸들러러
	const handleSubmit = () => {
		// 선택된 날짜와 시간 state값 전달하여 페이지 이동
		navigate('/recruit/meeting/submit', { state: { date: selectedDate, time: selectedTime } })
	}

	useEffect(() => {
		// 날짜와 시간이 선택되면 버튼 활성화
		selectedDate && selectedTime ? setActivebtn(true) : setActivebtn(false)
	}, [selectedDate, selectedTime])

	// 면접 일정 조회
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<recruitData[]>('https://dmu-dasom-api.or.kr/api/recruit')

				// KEY값 검색하여 데이터 조회하여 각 변수에 저장
				const periodData: interviewPeriod = {
					periodStart: response.data.find((item) => item.key === 'INTERVIEW_PERIOD_START')?.value.substring(0,10) || '',
					periodEnd: response.data.find((item) => item.key === 'INTERVIEW_PERIOD_END')?.value.substring(0,10) || '',
				}
				const timeData: interviewTime = {
					timeStart: response.data.find((item) => item.key === 'INTERVIEW_TIME_START')?.value || '',
					timeEnd: response.data.find((item) => item.key === 'INTERVIEW_TIME_END')?.value || '',
				}

				// 저장한 데이터 state에 반영
				setInterviewPeriodData(periodData)
				setInterviewTimeData(timeData)
			} catch (e: any) {
				console.log(e)
				alert('데이터 불러오기 오류')
			}
		}
		fetchData()
	}, [])

	// 음... 서버에서 예약 현황 받아와야함
	// 페이지 맨 처음 들어와서는 시간 선택 불가능하게
	// 날짜 선택하면 선택한 날짜에 예약 가능한 시간만 선택 가능하도록
	// 날짜 선택 값에 따라 시간 버튼 on off 유무 필요함
	// 예약 현황 데이터가 어떻게 들어오는지 모르겠는데... 데이터 형식 바꿔서 읽어야 될수도...
	// 합격 조회시 학번 + 전화번호뒷자리 로 개인코드 생성
	// 면접 예약 페이지 접근 시 코드 없으면 접근 불가
	// 면접 예약시 이 코드도 함께 api에 전달

	return (
		<MobileLayout>
			<RecruitHeader title='컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 모집 폼' />
			<RecruitUI />
			<div className='flex flex-col items-center w-full mb-40'>
				<Recruit_InfoBanner
					message={`1차 서류에 합격되신 점 다시 한번 축하드리며,
				 편하신 날짜의 시간대를 선택해주시길 바랍니다.`}
				/>
				<div className='mt-8 max-w-[90%]'>
					<p className='font-pretendardBold text-white mb-4'>면접일</p>
					<MeetingDateSelector onSelect={handleDateSelect} period={interviewPeriodData} />
					<p className='font-pretendardBold text-white mt-14 mb-4'>시간</p>
					<MeetingTimeSelector onSelect={handleTimeSelect} time={interviewTimeData} />
				</div>

				<Button className={`text-center p-1   ${activebtn ? 'bg-mainColor' : 'bg-subGrey3 opacity-30'}`} onClick={handleSubmit} disabled={!activebtn} text='면접일정 예약하기' />
			</div>
		</MobileLayout>
	)
}

export default RecruitMeeting
