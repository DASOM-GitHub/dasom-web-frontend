import React, { useState } from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { useNavigate } from 'react-router-dom'
import { RecruitUI, RecruitHeader } from '../components/UI/RecruitUI'
import { InputField } from '../components/UI/Recruit_InputField'
import { Button } from '../components/UI/Recruit_Button'

const Recruit: React.FC = () => {
  const navigate = useNavigate()
  const [contact, setContact] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    studentNo: '',
    contact: '',
    email: '',
    grade: 1,
    reasonForApply: '',
    activityWish: '',
    isMessageAgreed: false,
    isPrivacyPolicyAgreed: false,
  })

  // 📌 입력값들 제약조건 설정 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    let newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    if (name === 'contact') {
      let formattedValue = value.replace(/[^0-9]/g, '') 

     
      if (formattedValue.length > 11) {
        formattedValue = formattedValue.slice(0, 11)
      }

  
      if (formattedValue.length === 10) {
        formattedValue = formattedValue.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3') 
      } else if (formattedValue.length === 11) {
        formattedValue = formattedValue.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3') 
      }

      setContact(formattedValue)
      setFormData((prevData) => ({
        ...prevData,
        contact: formattedValue
      }))
    }
    else if (name === 'studentNo') {
      let formattedValue = value.replace(/[^0-9]/g, '') 
      formattedValue = formattedValue.slice(0, 8) 

      setFormData((prevData) => ({
        ...prevData,
        studentNo: formattedValue
      }))
    } else if (name === 'reasonForApply') {
      if (value.length <= 500) { 
        setFormData((prevData) => ({
          ...prevData,
          reasonForApply: value
        }))
      }
    }
    else if (name === 'activityWish') {
      if (value.length <= 200) { 
        setFormData((prevData) => ({
          ...prevData,
          activityWish: value
        }))
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue
      }))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault() 

      const form = e.currentTarget.form
      if (!form) return

      const elements = Array.from(form.elements) as HTMLElement[] 
      const index = elements.indexOf(e.currentTarget)

    
      for (let i = index + 1; i < elements.length; i++) {
        const nextElement = elements[i]
        if (nextElement instanceof HTMLInputElement || nextElement instanceof HTMLTextAreaElement || nextElement instanceof HTMLSelectElement) {
          nextElement.focus()
          break
        }
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.studentNo || !formData.contact || !formData.email || !formData.reasonForApply) {
      alert('모든 필수 정보를 입력해주세요.')
      return
    }

    try {
      const response = await fetch('https://dmu-dasom.or.kr/api/recruit/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ ...formData, isFirstRoundPassed: false, isSecondRoundPassed: false })
      })

      if (response.ok) {
        navigate('/recruit-submit')
      } else {
        const errorData = await response.json()
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error)
    }
  }

  return (
    <MobileLayout>
      <RecruitHeader title='컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 모집 폼' />
      <RecruitUI />
      <div className='flex flex-col items-center gap-6'>
        <form className='mt-3 bg-mainBlack w-full px-2 font-pretendardRegular' onSubmit={handleSubmit} >
          <InputField label='이름' name='name' value={formData.name} onChange={handleInputChange} onKeyDown={handleKeyPress} required />
          <InputField label='학번' name='studentNo' value={formData.studentNo} onChange={handleInputChange} required />
          <InputField label='연락처' name='contact' placeholder='ex) 010-0000-0000' value={formData.contact} onChange={handleInputChange} required />
          <InputField label='이메일' name='email' type='email' value={formData.email} onChange={handleInputChange} required />
          <InputField
            label='학년'
            name='grade'
            type='select'
            value={String(formData.grade)}
            onChange={handleInputChange}
            required
            options={[
              { value: '1', label: '1학년' },
              { value: '2', label: '2학년' },
              { value: '3', label: '3학년' },
              { value: '4', label: '4학년' }
            ]}
          />
          <InputField label='지원동기 (500자 이내)' name='reasonForApply' type='textarea' value={formData.reasonForApply} onChange={handleInputChange} required />
          <InputField label='동아리 내에서 하고 싶은 활동이 있다면 적어주세요!' name='activityWish' type='textarea' value={formData.activityWish} onChange={handleInputChange} required />
          <InputField
            label='🫧 면접 일자는 3월 15일(토)에 개별 연락처로 안내 후,'
            subLabel='3월 19일부터 3월 21일까지 대면으로 진행됩니다.'
            type='checkbox'
            name='isMessageAgreed'
            value={formData.isMessageAgreed}
            checked={formData.isMessageAgreed}
            onChange={handleInputChange}
          />
          <InputField
            label='⚠️ 수집된 개인정보는 동아리 활동에 이용되며, 추후 파기됩니다.'
            subLabel='또한 제공받은 정보는 공지사항 전달 및 비상 연락 용도로만 사용됩니다.'
            type='checkbox'
            name='isPrivacyPolicyAgreed'
            value={formData.isPrivacyPolicyAgreed}
            checked={formData.isPrivacyPolicyAgreed}
            onChange={handleInputChange}
          />
          <Button text='폼 제출하기' />
        </form>
      </div>
    </MobileLayout>
  )
}

export default Recruit
