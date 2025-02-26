import React from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { RecruitHeader, RecruitUI_SUB, RecruitUI_SUB2 } from '../components/UI/RecruitUI'
import { Button } from '../components/UI/Recruit_Button'


const RecruitCheck: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {name, isPassed} = location.state as {name:string, isPassed:boolean}

    return (
        <MobileLayout>
            <RecruitHeader title="컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 합격자 조회" />
            {isPassed? <RecruitUI_SUB name={name}/> : <RecruitUI_SUB2 name={name}/>}
            <div className='mt-5'>
                {isPassed? <Button text='예약하기' onClick={()=> {navigate('/recruit/meeting')}}/>: <Button text='메인으로 돌아가기' onClick={()=> {navigate('/')}}/>}
            </div>
        </MobileLayout>
    )
}

export default RecruitCheck
