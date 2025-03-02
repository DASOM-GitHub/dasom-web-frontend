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
	const [selectedTime, setSelectedTime] = useState<{ id: number | null; time: string | null }>({ id: null, time: '' })
	const [activebtn, setActivebtn] = useState<boolean>(false)
	const reservationCode = sessionStorage.getItem('reservationCode')
	const [disableSelectTime, setDisableSelectTime] = useState<boolean>(true)
	const [ids, setIds] = useState<number[]>([])

	// 날짜 선택 핸들러
	const handleDateSelect = (date: string) => {
		setSelectedDate(date)
		setDisableSelectTime(false)
	}

	// 시간 선택 핸들러
	const handleTimeSelect = (selectedTime: { id: number; time: string }) => {
		setSelectedTime(selectedTime)
	}

	// 면접 일정 폼 제출 핸들러
	const handleSubmit = async () => {
		try {
			await axios.post('https://dmu-dasom-api.or.kr/api/recruit/interview/reserve', {
				slotId: selectedTime.id,
				reservationCode: reservationCode,
			})
			// 선택된 날짜와 시간 state값 전달하여 페이지 이동
			navigate('/recruit/meeting/submit', { state: { date: selectedDate, time: selectedTime } })
		} catch (e: any) {
			console.log(e)
			const errorCode = e.response?.data?.code
			if (errorCode === 'APPLICANT_NOT_FOUND') {
				alert('지원자를 조회할 수 없습니다.')
			} else if (errorCode === 'C021') {
				alert('해당 면접 슬롯을 찾을 수 없습니다.')
			} else if (errorCode === 'ALREADY_RESERVED') {
				alert('이미 면접을 예약하였습니다.')
			} else if (errorCode === 'SLOT_FULL') {
				alert('해당 시간대에 가능한 면접 예약자 수가 가득 찼습니다.')
			} else {
				alert('면접 예약에 실패했습니다.')
			}
		}
	}

	// 확인코드 없으면 메인페이지로 이동
	useEffect(() => {
		if (!reservationCode) {
			alert('잘못된 접근입니다.')
			navigate('/')
		}
	}, [reservationCode])

	useEffect(() => {
		// 날짜와 시간이 선택되면 버튼 활성화
		selectedDate && selectedTime ? setActivebtn(true) : setActivebtn(false)
	}, [selectedDate, selectedTime])

	useEffect(() => {
		const fetchHealthCheck = async () => {
			await axios.get('https://dmu-dasom-api.or.kr/api/health-check')
		}
		fetchHealthCheck()
	}, [])

	// 면접 일정 조회
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<recruitData[]>('https://dmu-dasom-api.or.kr/api/recruit')

				// KEY값 검색하여 데이터 조회하여 각 변수에 저장
				const periodData: interviewPeriod = {
					periodStart: response.data.find((item) => item.key === 'INTERVIEW_PERIOD_START')?.value.substring(0, 10) || '',
					periodEnd: response.data.find((item) => item.key === 'INTERVIEW_PERIOD_END')?.value.substring(0, 10) || '',
				}
				const timeData: interviewTime = {
					timeStart: response.data.find((item) => item.key === 'INTERVIEW_TIME_START')?.value.substring(0, 5) || '',
					timeEnd: response.data.find((item) => item.key === 'INTERVIEW_TIME_END')?.value.substring(0, 5) || '',
				}

				// 저장한 데이터 state에 반영
				setInterviewPeriodData(periodData) // '2025-03-12'
				setInterviewTimeData(timeData) // '17:00'
			} catch (e: any) {
				console.log(e)
				alert('데이터 불러오기 오류')
			}
		}
		fetchData()
	}, [])

	// 면접 일정 생성
	useEffect(() => {
		if (!interviewPeriodData.periodStart || !interviewPeriodData.periodEnd || 
			!interviewTimeData.timeStart || !interviewTimeData.timeEnd) return
	
		const createSchedule = async () => {
			try {
				const response = await axios.post('https://dmu-dasom-api.or.kr/api/recruit/interview/schedule', {
					startDate: interviewPeriodData.periodStart,
					endDate: interviewPeriodData.periodEnd,
					startTime: interviewTimeData.timeStart,
					endTime: interviewTimeData.timeEnd
				})
				// 응답에서 id 값을 추출
				const createdSchedules = response.data  // 예시: [{ id: 865, interviewDate: "2025-03-12", ... }]
            
				// id를 배열로 추출
				const ids = createdSchedules.map((schedule: { id: number }) => schedule.id)
				console.log('Created Schedule IDs:', ids)
				setIds(ids)
			} catch (e: any) {
				console.log(e)
				alert('면접 일정 생성 중 오류가 발생했습니다.')
			}
		}
		createSchedule()
	}, [interviewPeriodData, interviewTimeData])
	
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
					<MeetingTimeSelector onSelect={handleTimeSelect} time={interviewTimeData} disabledSelectTime={disableSelectTime} scheduleId={ids} />
				</div>

				<Button className={`text-center p-1   ${activebtn ? 'bg-mainColor' : 'bg-subGrey3 opacity-30'}`} onClick={handleSubmit} disabled={!activebtn} text='면접일정 예약하기' />
			</div>
		</MobileLayout>
	)
}

export default RecruitMeeting
