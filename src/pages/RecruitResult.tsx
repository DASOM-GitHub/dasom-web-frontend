import React from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/UI/Header'
import { Button } from '../components/UI/Recruit_Button'
import { RecruitHeader } from '../components/UI/RecruitUI'
import { InputField } from '../components/UI/Recruit_InputField'

export const RecruitResult: React.FC = () => {

  const navigate = useNavigate() 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() 
    navigate('/recruit-check') 
  }
  return (
    <MobileLayout>
      <Header />
      <RecruitHeader title="컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 합격자 조회" />
      <form className="mt-4 bg-mainBlack w-full px-2" onSubmit={handleSubmit}>
        <InputField
          label="학번 마지막 4자리 + 전화번호 마지막 4자리를 입력해주세요."
          subLabel='ex) 08470542'
          type='test'
          required
        />
        <Button text="결과 확인하기"/>
      </form>
    </MobileLayout>
  )
}


