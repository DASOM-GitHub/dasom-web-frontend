import React from 'react'
import { useLocation } from 'react-router-dom'
import MobileLayout from '../components/layout/MobileLayout'
import { RecruitHeader, RecruitUI } from '../components/UI/RecruitUI'

const RecruitSubmitMeeting: React.FC = () => {
	const location = useLocation()
	const { date, time } = location.state as { date: string; time: string }

	return (
		<MobileLayout>
			<RecruitHeader title='컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 모집 폼' />
			<RecruitUI />
			<div className='flex flex-col items-center w-full mt-12'>
				<p className='font-pretendardBold text-white text-center bg-mainColor w-[90%]'>
					면접일 제출이 완료되었습니다.
					<br />
					{date} {time} 에 만나뵙겠습니다. 감사합니다.
				</p>
			</div>
		</MobileLayout>
	)
}

export default RecruitSubmitMeeting
