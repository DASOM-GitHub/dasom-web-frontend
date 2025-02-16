import React, { useState } from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/UI/Header'
import { RecruitUI, RecruitHeader } from '../components/UI/RecruitUI'
import { InputField } from '../components/UI/Recruit_InputField'
import { Button } from '../components/UI/Recruit_Button'

const Recruit: React.FC = () => {

  const navigate = useNavigate() 


  const [formData, setFormData] = useState({
    name: '',
    studentNo: '',
    contact: '',
    email: '',
    grade: '',
    reasonForApply: '',
    activityWish: '',
    isPrivacyPolicyAgreed: false, // 개인정보 동의 체크
    isOverwriteConfirmed: false, // 중복 지원 여부 체크
  })


  // 📌 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }))
  }

  // 📌 API 요청 보내기 (POST)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 유효성 검사 (예: 모든 필수 값 입력 확인)
    if (!formData.name || !formData.studentNo || !formData.contact || !formData.email || !formData.reasonForApply) {
      alert('모든 필수 정보를 입력해주세요.')
      return
    }

    try {
      const response = await fetch('http://dmu-dasom/or.kr/api/recruit/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('지원이 성공적으로 제출되었습니다!')
        navigate('/recruit-submit') // ✅ 제출 후 페이지 이동
      } else {
        const errorData = await response.json()
        alert(`오류 발생: ${errorData.message}`)
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error)
      alert('지원 제출 중 오류가 발생했습니다.')
    }
  }


  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault() 
  //   navigate('/recruit-submit') 
  // }

  return (
    <MobileLayout>
      <RecruitHeader title="컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 모집 폼" />
      <RecruitUI />
      <div className=" flex flex-col items-center gap-6 mb-40 ">
        <form className="mt-3 bg-mainBlack w-full px-2" onSubmit={handleSubmit}>
          <InputField label="이름" required />
          <InputField label="학번" required />
          <InputField label="연락처" placeholder="ex) 010-0000-0000" required />
          <InputField label="이메일" type="email" required />
          <InputField
            label="학년"
            type="select"
            required
            options={[
              { value: '1', label: '1학년' },
              { value: '2', label: '2학년' },
              { value: '3', label: '3학년' },
              { value: '4', label: '4학년' },
            ]}
          />
          <InputField label="지원동기 (500자 이내)" type='textarea' required />
          <InputField label="동아리 내에서 하고 싶은 활동이 있다면 적어주세요!" type='textarea' required />
          <InputField
            label="🫧 면접 일자는 3월 15일(토)에 개별 연락처로 안내 후,"
            subLabel="3월 19일부터 3월 21일까지 대면으로 진행됩니다."
            type='checkbox'
            required
          />
          <InputField
            label="⚠️ 수집된 개인정보는 동아리 활동에 이용되며, 추후 파기됩니다."
            subLabel="또한 제공받은 정보는 공지사항 전달 및 비상 연락 용도로만 사용됩니다."
            type='checkbox'
            required
          />
          <Button text="폼 제출하기" />
        </form>
      </div>

    </MobileLayout>
  )
}

export default Recruit
