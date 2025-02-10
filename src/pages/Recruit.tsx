import React from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { Header } from '../components/UI/Header'
import { RecruitUI, RecruitHeader } from '../components/UI/RecruitUI'
import { InputField } from '../components/UI/Recruit_InputField'
import { Button } from '../components/UI/Recruit_Button'

const Recruit: React.FC = () => {
  return (
    <MobileLayout>
      <Header />
      <RecruitHeader title="컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 모집 폼" />
      <RecruitUI />
      <div className=" flex flex-col items-center gap-6">
        <form className="mt-3 bg-mainBlack w-full px-2">
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
        </form>



      </div>
      <Button text="폼 제출하기" />
    </MobileLayout>
  )
}

export default Recruit
