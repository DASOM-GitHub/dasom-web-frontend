import React, { useState, useEffect, useRef } from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { useNavigate } from 'react-router-dom'
import { RecruitUI, RecruitHeader } from '../components/UI/RecruitUI'
import { InputField } from '../components/UI/Recruit_InputField'
import { Button } from '../components/UI/Recruit_Button'

const Recruit: React.FC = () => {
  const navigate = useNavigate()
  const [contact, setContact] = useState('')
  const [isRecruiting, setIsRecruiting] = useState<boolean | null>(null)
  const alertShown = useRef(false)

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

  useEffect(() => {
    const checkRecruitmentPeriod = async () => {
      try {
        const response = await fetch('https://dmu-dasom-api.or.kr/api/recruit')
        const data = await response.json()

        const recruitmentStart = data.find((item: any) => item.key === 'RECRUITMENT_PERIOD_START')?.value
        const recruitmentEnd = data.find((item: any) => item.key === 'RECRUITMENT_PERIOD_END')?.value

        const startDate = new Date(recruitmentStart)
        const endDate = new Date(recruitmentEnd)
        const now = new Date()


        if (now >= startDate && now <= endDate) {
          setIsRecruiting(true) 
        } else {
          setIsRecruiting(false)
          if (!alertShown.current) { 
            alertShown.current = true
            alert('현재 모집 기간이 아닙니다.')
            navigate('/')
          }
        }
      } catch (error) {
        console.error('모집 기간 확인 중 오류 발생:', error)
        setIsRecruiting(false)
        if (!alertShown.current) {
          alertShown.current = true
          alert('네트워크 오류가 발생했습니다.')
          navigate('/')
        }
      }
    }

    checkRecruitmentPeriod()
  }, [navigate])

  if (isRecruiting === false) return null


  // 입력값들 제약조건 설정 
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
    else if (name === 'name') {
      if (value.length <= 16) {
        setFormData((prevData) => ({
          ...prevData,
          name: value
        }))
      }
    } else if (name === 'studentNo') {
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

      let requestBody = {
        ...formData,
        isFirstRoundPassed: false,
        isSecondRoundPassed: false,
        isOverwriteConfirmed: false
      }

      const response = await fetch('https://dmu-dasom-api.or.kr/api/recruit/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (response.status === 400) {
        const errorData = await response.json()

        if (errorData.code === 'C013') {
          const confirmOverwrite = window.confirm(
            '이미 지원한 학번이 존재합니다. 기존 정보를 덮어쓰시겠습니까?'
          )

          if (confirmOverwrite) {
            requestBody.isOverwriteConfirmed = true

            const overwriteResponse = await fetch('https://dmu-dasom-api.or.kr/api/recruit/apply', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(requestBody)
            })

            if (overwriteResponse.ok) {
              navigate('/recruit/submit')
              return
            } else {
              const overwriteError = await overwriteResponse.json()
              alert(overwriteError.message || '덮어쓰기 요청 중 오류가 발생했습니다.')
              return
            }
          } else {
            alert('지원이 취소되었습니다.')
            return
          }
        }
      }

      if (response.ok) {
        navigate('/recruit/submit')
      } else {
        const errorData = await response.json()
        alert(errorData.message || '오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error)
      alert('네트워크 오류가 발생했습니다.')
    }
  }
  return (
    <MobileLayout>
      <RecruitHeader title='컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 모집 폼' />
      <RecruitUI />
      <div className='flex flex-col items-center gap-6 mb-40'>
        <form className='mt-3 bg-mainBlack w-full px-2 font-pretendardRegular' onSubmit={handleSubmit} >
          <InputField label='이름' name='name' value={formData.name} onChange={handleInputChange} onKeyDown={handleKeyPress}
            required minLength={1} maxLength={16} />
          <InputField label='학번' name='studentNo' value={formData.studentNo} onChange={handleInputChange} highlightLabels={[]} required />
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
          <InputField label='동아리 내에서 하고 싶은 활동이 있다면 적어주세요!' name='activityWish' type='textarea' value={formData.activityWish} onChange={handleInputChange} />
          <InputField
            label='🫧 면접 일자는 3월 11일(토)에 개별 연락처로 안내 후,'
            subLabel='3월 12일부터 3월 14일까지 대면으로 진행됩니다.'
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