import { useState } from 'react'
import { createRecruitApplication, overwriteRecruitApplication } from './RecruitService'
import { RecruitFormData } from './Recruittype'
import { useNavigate } from 'react-router-dom'

export const useRecruitForm = () => {
    const navigate = useNavigate()
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

      // 입력값들 제약조건 설정
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    let newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

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

      setFormData(prevData => ({
        ...prevData,
        contact: formattedValue,
      }))
    } else if (name === 'name') {
      if (value.length <= 16) {
        setFormData(prevData => ({
          ...prevData,
          name: value,
        }))
      }
    } else if (name === 'studentNo') {
      let formattedValue = value.replace(/[^0-9]/g, '')
      formattedValue = formattedValue.slice(0, 8)

      setFormData(prevData => ({
        ...prevData,
        studentNo: formattedValue,
      }))
    } else if (name === 'reasonForApply') {
      if (value.length <= 500) {
        setFormData(prevData => ({
          ...prevData,
          reasonForApply: value,
        }))
      }
    } else if (name === 'activityWish') {
      if (value.length <= 200) {
        setFormData(prevData => ({
          ...prevData,
          activityWish: value,
        }))
      }
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

    console.log('Submitted Form Data:', formData)

    if (
      !formData.name ||
      !formData.studentNo ||
      !formData.contact ||
      !formData.email ||
      !formData.reasonForApply
    ) {
      alert('모든 필수 정보를 입력해주세요.')
      return
    }

    if (!formData.isMessageAgreed || !formData.isPrivacyPolicyAgreed) {
      alert('모든 필수 체크박스를 선택해주세요.')
      return
    }

    let requestBody: RecruitFormData = {
      ...formData,
      isFirstRoundPassed: false,
      isSecondRoundPassed: false,
      isOverwriteConfirmed: false,
    }

    try {
      await createRecruitApplication(requestBody)
      navigate('/recruit/submit')
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data

        if (error.response.status === 400 && errorData.code === 'C013') {
          const confirmOverwrite = window.confirm(
            '이미 지원한 학번이 존재합니다. 기존 정보를 덮어쓰시겠습니까?'
          )

          if (confirmOverwrite) {
            try {
              await overwriteRecruitApplication(requestBody)
              navigate('/recruit/submit')
            } catch (overwriteError: any) {
              alert(
                overwriteError.response?.data?.message ||
                  '덮어쓰기 요청 중 오류가 발생했습니다.'
              )
            }
          } else {
            alert('지원이 취소되었습니다.')
          }
        }
      } else {
        console.error('API 요청 중 오류 발생:', error)
        alert('네트워크 오류가 발생했습니다.')
      }
    }
  }

      return { formData, setFormData, handleInputChange, handleKeyPress, handleSubmit }
}