import React, { useState } from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/UI/Recruit_Button'
import { RecruitHeader } from '../components/UI/RecruitUI'
import { InputField } from '../components/UI/Recruit_InputField'

export const RecruitResult: React.FC = () => {
  const navigate = useNavigate()

  // 🔹 입력값 상태 추가
  const [checkInput, setCheckInput] = useState('')

  // 🔹 입력 핸들러 추가 (이벤트 타입 명확히 지정)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCheckInput(e.target.value)
  }

  // 🔹 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/recruit-check')
  }

  return (
    <MobileLayout>
      <RecruitHeader title="컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 합격자 조회" />
      <form className="mt-4 bg-mainBlack w-full px-2" onSubmit={handleSubmit}>
        <InputField
          label="학번 마지막 4자리 + 전화번호 마지막 4자리를 입력해주세요."
          subLabel="ex) 08470542"
          type="text"
          name="checkInput"
          value={checkInput} // ✅ value 추가
          onChange={handleInputChange} // ✅ onChange 추가
        />
        <Button text="결과 확인하기" />
      </form>
    </MobileLayout>
  )
}
