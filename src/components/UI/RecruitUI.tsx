import React, { useEffect, useState } from 'react'

interface RecruitHeaderProps {
  title: string;
}

export const RecruitHeader: React.FC<RecruitHeaderProps> = ({ title }) => {
  return (
    <div className=" w-full max-w-[375px] bg-[#00B493] text-white font-pretendardBold text-[13px] p-1 pl-2 ml-2.5 mt-16">
      {title}
    </div>
  )
}

export const RecruitUI: React.FC = () => {

  const [recruitmentData, setRecruitmentData] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    fetch('https://dmu-dasom.or.kr/api/recruit', {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {
          const formattedData: Record<string, string> = {}
          data.forEach((item) => {
            formattedData[item.key] = item.value
          })
          setRecruitmentData(formattedData)

        } else {
          console.error('예상하지 못한 응답 형식:', data)
        }
      })
      .catch((error) => {
        console.error('API 요청 오류:', error)
      })
  }, [])

  {/* 데이터 형식 번경 기능  */ }
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const options: Intl.DateTimeFormatOptions = {
      month: 'numeric',
      day: 'numeric',
      weekday: 'short'
    }
    return new Intl.DateTimeFormat('ko-KR', options).format(date)
  }

  return (
    <div className="text-white font-pretendardRegular flex flex-col text-[12px] items-start max-w-[375px] shadow-[0px_2px_3px_rgba(255,255,255,0.2)] bg-#17171B] gap-2 ml-2.5">
      <p className="pl-2 pt-2">
        <span className='font-pretendardBold'>다솜</span>에서 개발자로서 성장해갈 <span className="text-yellow-400 font-pretendardBold">34기 멤버분들</span>을 찾습니다!
      </p>
      <div className="mt-2 pl-2">
        <p className="text-green-400 font-pretendardSemiBold">📅 모집 일정 :</p>
        {recruitmentData ? (
          <p>모집 폼 제출 : {formatDate(recruitmentData.RECRUITMENT_PERIOD_START)} ~ {formatDate(recruitmentData.RECRUITMENT_PERIOD_START)}</p>
        ) : (
          <p>모집 일정 불러오는 중...</p>
        )}
        {recruitmentData ? (
          <p>대면 면접 : {formatDate(recruitmentData.INTERVIEW_PERIOD_START)} ~ {formatDate(recruitmentData.INTERVIEW_PERIOD_END)}</p>
        ) : (
          <p>대면 일정 불러오는 중...</p>
        )}
        {recruitmentData ? (
          <p>최종 합격자 발표 : {formatDate(recruitmentData.INTERVIEW_PERIOD_START)}</p>
        ) : (
          <p>최종 합격 일정 불러오는 중...</p>
        )}
      </div>

      <div className="mt-2 pl-2  flex items-center">
        <p className="text-green-400 font-pretendardSemiBold">📝 모집 대상 :</p>
        <span className="text-white pl-1">25년도 1학기부터 다솜과 함께할 예비 다솜 멤버</span>
      </div>

      <div className="mt-2 pl-2  flex items-center">
        <p className="text-green-400 font-pretendardSemiBold">🌿 신청 조건 :</p>
        <span className="text-white pl-1 ">컴퓨터소프트웨어공학과 학생</span>
      </div>

      <div className="mt-2  pl-2">
        <p className="text-green-400 font-pretendardSemiBold inline">🍀 회비 :</p>
        <span className="text-white pl-1 inline">20,000원</span>
        <p className="text-white mt-1">
          회비는 동아리 운영자금 및 프로젝트 서버비용 지원 등에 사용됩니다.
        </p>
      </div>
      <p className="pl-2 mb-4 ">👀 의지가 있으며 교류를 중시하는 분을 기다립니다.</p>
    </div>
  )
}


export const RecruitUI_SUB: React.FC = () => {
  return (
    <div className="whitespace-pre-line text-white flex flex-col items-start max-w-[375px] h-[auto] shadow-[0px_2px_3px_rgba(255,255,255,0.2)] bg-#17171B] gap-2 ml-2.5 font-pretendardRegular pl-2 pr-2 text-[12px] ">

      <p className="pt-3 ">
        {`___님 안녕하세요 컴퓨터공학부 전공동아리 다솜입니다.
        먼저 다솜 34기에 많은 관심을 갖고 지원해 주셔서 감사드리며, `}
        <p><span className='text-green-400 font-pretendardBold'>1차 서류 합격</span>을 진심으로 축하드립니다!</p>
      </p>

      <p >{`다음 전형인 대면 인터뷰에서 뵐 수 있게 되어 기쁜 마음을 담아
        안내드립니다.`}
      </p>

      <p className='mb-10'>{`대면 인터뷰는 3/19(수)~21(금) 중에 진행 될 예정이며 편한 시간대로
        폼을 작성해주시면 감사하겟습니다.`}</p>
    </div>
  )
}

