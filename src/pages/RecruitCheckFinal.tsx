import MobileLayout from '../components/layout/MobileLayout'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { RecruitHeader, RecruitUI_FINAL, RecruitUI_FINAL2 } from '../components/UI/RecruitUI'

const RecruitChekFinal: React.FC = () => {
	const location = useLocation()
    const {name, isPassed} = location.state as {name:string, isPassed:boolean}

	return (
		<MobileLayout>
			<RecruitHeader title='컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 합격자 조회' />
			{isPassed? <RecruitUI_FINAL name={name}/> : <RecruitUI_FINAL2 name={name}/> }
			<div className='mt-5'>
			</div>
		</MobileLayout>
	)
}

export default RecruitChekFinal