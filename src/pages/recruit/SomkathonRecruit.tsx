import React, { useState, useEffect, useRef } from 'react'
import MobileLayout from '../../components/layout/MobileLayout'
import { useNavigate } from 'react-router-dom'
import { SomRecruitUI, RecruitHeader } from '../../components/UI/RecruitUI'
import { InputField } from '../../components/UI/Recruit_InputField'
import { Button } from '../../components/UI/Recruit_Button'
import { SomkathonRecruitFormData } from './Recruittype'
import { createSomkathonParticipant } from './RecruitService'

const SomkathonRecruit: React.FC = () => {
  const navigate = useNavigate()
  const [contact, setContact] = useState('')
  const [isRecruiting, setIsRecruiting] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const alertShown = useRef(false)

  const [formData, setFormData] = useState<SomkathonRecruitFormData>({
    participantName: '',
    studentId: '',
    department: '',
    grade: '1',
    contact: '',
    email: '',
    githubLink: '',
    portfolioLink: '',
    positions: ''
  })

  useEffect(() => {
    const checkRecruitmentPeriod = async () => {
      const startDate = new Date('2025-11-03T00:00:00')
      const endDate = new Date('2025-11-09T23:59:59')
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
    }

    checkRecruitmentPeriod()
  }, [navigate])

  if (isRecruiting === false) return null

  // 입력값들 제약조건 설정
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    let newValue = value

    if (name === 'contact') {
      let formattedValue = value.replace(/[^0-9]/g, '')

      if (formattedValue.length > 11) {
        formattedValue = formattedValue.slice(0, 11)
      }

      if (formattedValue.length === 10) {
        formattedValue = formattedValue.replace(
          /^(\d{3})(\d{3})(\d{4})$/,
          '$1-$2-$3'
        )
      } else if (formattedValue.length === 11) {
        formattedValue = formattedValue.replace(
          /^(\d{3})(\d{4})(\d{4})$/,
          '$1-$2-$3'
        )
      }

      setContact(formattedValue)
      setFormData(prevData => ({
        ...prevData,
        contact: formattedValue,
      }))
    } else if (name === 'participantName') {
      if (value.length <= 16) {
        setFormData(prevData => ({
          ...prevData,
          participantName: value,
        }))
      }
    } else if (name === 'studentId') {
      let formattedValue = value.replace(/[^0-9]/g, '')
      formattedValue = formattedValue.slice(0, 8)

      setFormData(prevData => ({
        ...prevData,
        studentId: formattedValue,
      }))
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: newValue,
      }))
    }
  }

  const handleKeyPress = (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const form = e.currentTarget.form
      if (!form) return

      const elements = Array.from(form.elements) as HTMLElement[]
      const index = elements.indexOf(e.currentTarget)

      for (let i = index + 1; i < elements.length; i++) {
        const nextElement = elements[i]
        if (
          nextElement instanceof HTMLInputElement ||
          nextElement instanceof HTMLTextAreaElement ||
          nextElement instanceof HTMLSelectElement
        ) {
          nextElement.focus()
          break
        }
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !formData.participantName ||
      !formData.studentId ||
      !formData.contact ||
      !formData.email ||
      !formData.department ||
      !formData.positions
    ) {
      alert('모든 필수 정보를 입력해주세요.')
      return
    }

    if (!/^\d{8}$/.test(formData.studentId)) {
      alert('학번은 8자리 숫자여야 합니다.')
      return
    }

    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.contact)) {
      alert('연락처 형식을 확인해주세요. (예: 01012345678)')
      return
    }

    if (!formData.portfolioLink.startsWith('https')) {
      alert('포트폴리오 링크를 https:// 를 포함하는 형식으로 작성해주세요.')
      return
    }


    setIsSubmitting(true)
    try {
      console.log('Submitted Form Data:', formData)
      await createSomkathonParticipant(formData)
      navigate('/somkathon/submit')
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data

        if (
          (error.response.status === 400 && errorData.code === 'C001') ||
          errorData.code === 'C007'
        ) {
          alert('입력 정보를 다시 확인해주세요.')
        } else if (error.response.status === 400 && errorData.code === 'C002') {
          alert('이미 등록된 학번입니다.')
        }
      } else {
        console.error('API 요청 중 오류 발생:', error)
        alert('네트워크 오류가 발생했습니다.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-subGrey3' style={{ minHeight: 'calc(100vh - 56px)' }}>
      <MobileLayout>
        <RecruitHeader title='다솜 해커톤 프로젝트 : 솜커톤 SOMKATHON 모집 폼' />
        <SomRecruitUI />
        <div className='flex flex-col items-center gap-6 mb-40'>
          <form
            className='flex flex-col items-center mt-3 bg-mainBlack w-full px-2 font-pretendardRegular'
            onSubmit={handleSubmit}
          >
            <InputField
              label='이름'
              name='participantName'
              value={formData.participantName}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              required
              minLength={1}
              maxLength={16}
            />
            <InputField
              label='학번'
              name='studentId'
              value={formData.studentId}
              onChange={handleInputChange}
              highlightLabels={[]}
              required
            />
            <InputField
              label='학과'
              name='department'
              value={formData.department}
              onChange={handleInputChange}
              required
            />
            <InputField
              label='학년'
              name='grade'
              type='select'
              value={formData.grade}
              onChange={handleInputChange}
              required
              options={[
                { value: '1', label: '1학년' },
                { value: '2', label: '2학년' },
                { value: '3', label: '3학년' },
                { value: '4', label: '4학년' },
              ]}
            />
            <InputField
              label='연락처'
              name='contact'
              placeholder='숫자만 입력해주세요'
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
            <InputField
              label='이메일'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <InputField
              label='포트폴리오 링크'
              name='portfolioLink'
              placeholder='Notion, 개인 블로그, Google Drive 등 / (ex: https://portfolio.com/username)'
              value={formData.portfolioLink}
              onChange={handleInputChange}
              required
            />
            <InputField
              label='GitHub 링크'
              name='githubLink'
              value={formData.githubLink}
              onChange={handleInputChange}
            />
            <InputField
              label='희망 포지션'
              name='positions'
              type='select'
              value={formData.positions}
              onChange={handleInputChange}
              required
              options={[
                { value: 'FRONTEND', label: '프론트엔드' },
                { value: 'BACKEND', label: '백엔드' },
                { value: 'PM', label: '기획' },
                { value: 'DESIGN', label: '디자인' },
              ]}
            />
            <Button text={isSubmitting ? '제출 중...' : '폼 제출하기'} disabled={isSubmitting} />
          </form>
        </div>
      </MobileLayout>
    </div>
  )
}

export default SomkathonRecruit
