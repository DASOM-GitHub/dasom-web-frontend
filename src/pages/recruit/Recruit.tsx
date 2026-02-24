import React, { useState, useEffect, useRef, useCallback } from 'react'
import MobileLayout from '../../components/layout/MobileLayout'
import { useNavigate } from 'react-router-dom'
import { RecruitUI, RecruitHeader } from '../../components/UI/RecruitUI'
import { InputField } from '../../components/UI/Recruit_InputField'
import { Button } from '../../components/UI/Recruit_Button'
import { useRecruitForm } from './useRecruitForm'
import { useRecruitSchedule, formatKoreanDate } from './useRecruitSchedule'
import { RecruitInterviewData } from './Recruittype'

const Recruit: React.FC = () => {
  const navigate = useNavigate()
  const alertShown = useRef(false)
  const { isRecruiting, loadSchedule } = useRecruitSchedule()
  const { formData, handleInputChange, handleKeyPress, handleSubmit } =
    useRecruitForm()

  const [interviewData, setInterviewData] = useState<RecruitInterviewData>({
    documentPassAnnouncement: '',
    interviewPeriodStart: '',
    interviewPeriodEnd: '',
  })

  const checkRecruitmentPeriod = useCallback(async () => {
    try {
      const { scheduleData } = await loadSchedule()

      // 면접 일정 데이터 포맷
      setInterviewData({
        documentPassAnnouncement: formatKoreanDate(
          scheduleData.documentPassAnnouncement
        ),
        interviewPeriodStart: formatKoreanDate(
          scheduleData.interviewPeriodStart
        ),
        interviewPeriodEnd: formatKoreanDate(scheduleData.interviewPeriodEnd),
      })
    } catch (error) {
      console.error('모집 기간 확인 중 오류 발생:', error)
      if (!alertShown.current) {
        alertShown.current = true
        alert('네트워크 오류가 발생했습니다.')
        navigate('/')
      }
    }
  }, [loadSchedule, navigate])

  useEffect(() => {
    checkRecruitmentPeriod()
  }, [checkRecruitmentPeriod])

  // useEffect(() => {
  //   if (isRecruiting === false && !alertShown.current) {
  //     alertShown.current = true
  //     alert('현재 모집 기간이 아닙니다.')
  //     navigate('/')
  //   }
  // }, [isRecruiting, navigate])

  // if (isRecruiting === false) return null

  return (
    <div className='bg-subGrey3' style={{ minHeight: 'calc(100vh - 56px)' }}>
      <MobileLayout>
        <RecruitHeader title='컴퓨터 소프트웨어 공학과 전공 동아리 다솜 35기 모집 폼' />
        <RecruitUI />
        <div className='flex flex-col items-center gap-6 mb-40'>
          <form
            className='mt-3 bg-mainBlack w-full px-2 font-pretendardRegular flex flex-col items-center'
            onSubmit={handleSubmit}
          >
            <InputField
              label='이름'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              required
              minLength={1}
              maxLength={16}
            />
            <InputField
              label='학번'
              name='studentNo'
              value={formData.studentNo}
              onChange={handleInputChange}
              highlightLabels={[]}
              required
            />
            <InputField
              label='연락처'
              name='contact'
              placeholder='ex) 010-0000-0000'
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
                { value: '4', label: '4학년' },
              ]}
            />
            <InputField
              label='지원동기 (500자 이내)'
              name='reasonForApply'
              type='textarea'
              value={formData.reasonForApply}
              onChange={handleInputChange}
              required
            />
            <InputField
              label='동아리 내에서 하고 싶은 활동이 있다면 적어주세요!'
              name='activityWish'
              type='textarea'
              value={formData.activityWish}
              onChange={handleInputChange}
            />
            <InputField
              label={`🫧 면접 일자는 ${interviewData.documentPassAnnouncement}에 개별
              연락처로 안내 후,`}
              subLabel={`${interviewData.interviewPeriodStart}부터 ${interviewData.interviewPeriodEnd}까지 대면으로 진행됩니다.`}
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
    </div>
  )
}

export default Recruit
