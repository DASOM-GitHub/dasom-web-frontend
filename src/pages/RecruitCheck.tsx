import React from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/UI/Header'
import { RecruitHeader, RecruitUI_SUB } from '../components/UI/RecruitUI'
import { Button } from '../components/UI/Recruit_Button'


const RecruitCheck: React.FC = () => {

    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        navigate('/recruit-submit')
    }

    return (
        <MobileLayout>
            <Header />
            <RecruitHeader title="컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 합격자 조회" />
            <RecruitUI_SUB />
            <div className='mt-5'>
            <Button text="예약하기" />
            </div>
        </MobileLayout>
    )
}

export default RecruitCheck
