import React, { useEffect } from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { RecruitHeader, RecruitUI_SUB, RecruitUI_SUB2 } from '../components/UI/RecruitUI'
import { Button } from '../components/UI/Recruit_Button'

const RecruitCheck: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {name, isPassed, studentNo, contactLastDigit} = location.state as {name:string, isPassed:boolean, studentNo:string, contactLastDigit:string}

    // 1차 합격시 개인 코드 생성 후 session에 저장
    useEffect(()=> {
        if(isPassed) {
            const reservationCode = studentNo + contactLastDigit
            sessionStorage.setItem('reservationCode', reservationCode)
        }
    },[])

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