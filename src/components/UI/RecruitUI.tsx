import React, { useEffect, useState } from 'react'

interface RecruitHeaderProps {
  title: string;
}

interface RecruitUIProps {
  name: string
}

export const RecruitHeader: React.FC<RecruitHeaderProps> = ({ title }) => {
  return (
    <div className="w-auto bg-[#00B493] text-white font-pretendardBold text-[13px] p-1 pl-2 mx-2 mt-16">
      {title}
    </div>
  )
}

export const RecruitUI: React.FC = () => {

  const [recruitmentData, setRecruitmentData] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    fetch('https://dmu-dasom-api.or.kr/api/recruit', {
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
    <div className="text-white font-pretendardRegular flex flex-col text-[12px] items-start w-auto shadow-[0px_2px_3px_rgba(255,255,255,0.2)] bg-#17171B] gap-2 mx-2">
      <p className="pl-2 pt-2">
        <span className='font-pretendardBold'>다솜</span>에서 개발자로서 성장해 갈 <span className="font-pretendardBold">34기 멤버분들</span>을 찾습니다!
      </p>
      <div className="mt-2 pl-2">
        <p className="text-mainColor font-pretendardSemiBold">📅 모집 일정 :</p>
        {recruitmentData ? (
          <p>모집 폼 제출 : {formatDate(recruitmentData.RECRUITMENT_PERIOD_START)} ~ {formatDate(recruitmentData.RECRUITMENT_PERIOD_END)}</p>
        ) : (
          <p>모집 일정 불러오는 중...</p>
        )}
        {recruitmentData ? (
          <p>대면 면접 : {formatDate(recruitmentData.INTERVIEW_PERIOD_START)} ~ {formatDate(recruitmentData.INTERVIEW_PERIOD_END)}</p>
        ) : (
          <p>대면 일정 불러오는 중...</p>
        )}
        {recruitmentData ? (
          <p>최종 합격자 발표 : {formatDate(recruitmentData.INTERVIEW_PASS_ANNOUNCEMENT)}</p>
        ) : (
          <p>최종 합격 일정 불러오는 중...</p>
        )}
      </div>

      <div className="mt-2 pl-2  flex items-center">
        <p className="text-mainColor font-pretendardSemiBold">📝 모집 대상 :</p>
        <span className="text-white pl-1">25년도 1학기부터 다솜과 함께할 예비 다솜 멤버</span>
      </div>

      <div className="mt-2 pl-2  flex items-center">
        <p className="text-mainColor font-pretendardSemiBold">🌿 신청 조건 :</p>
        <span className="text-white pl-1 ">컴퓨터공학부 학생</span>
      </div>

      <div className="mt-2  pl-2">
        <p className="text-mainColor font-pretendardSemiBold inline">🍀 회비 :</p>
        <span className="text-white pl-1 inline">20,000원</span>
        <p className="text-white mt-1">
          회비는 동아리 운영자금 및 프로젝트 서버비용 지원 등에 사용됩니다.
        </p>
      </div>
      <p className="pl-2 mb-4 ">👀 의지가 있으며 교류를 중시하는 분을 기다립니다.</p>
    </div>
  )
}

export const RecruitUI_SUB: React.FC<RecruitUIProps> = ({ name }) => {
  return (
    <div className="whitespace-pre-line text-white flex flex-col items-start w-auto h-[auto] shadow-[0px_2px_3px_rgba(255,255,255,0.2)] bg-#17171B] gap-2 mx-2 font-pretendardRegular pl-2 text-[12px] ">

      <p className="pt-3 ">
        {`${name}님 안녕하세요 컴퓨터공학부 전공동아리 다솜입니다.
        먼저 다솜 34기에 많은 관심을 갖고 지원해 주셔서 감사드리며, `}
        <p><span className='text-mainColor font-pretendardBold'>1차 서류 합격</span>을 진심으로 축하드립니다!</p>
      </p>

      <p >{`다음 전형인 대면 인터뷰에서 뵐 수 있게 되어 기쁜 마음을 담아
        안내드립니다.`}
      </p>

      <p className='mb-3'>{`대면 인터뷰는 3/12(수)~14(금) 중에 진행 될 예정이며 편한 시간대로
        폼을 작성해주시면 감사하겠습니다.`}</p>
    </div>
  )
}

export const RecruitUI_SUB2: React.FC<RecruitUIProps> = ({ name }) => {
  return (
    <div className="whitespace-pre-line text-white flex flex-col items-start w-auto h-[auto] shadow-[0px_2px_3px_rgba(255,255,255,0.2)] bg-#17171B] gap-2 mx-2 font-pretendardRegular pl-2 text-[12px] ">

      <p className="pt-3 ">
        {`${name}님 안녕하세요 컴퓨터공학부 전공동아리 다솜입니다.
        먼저 다솜 34기에 많은 관심을 갖고 지원해 주셔서 감사드리며, `}
      </p>

      <p >{`안타깝게도, 모집 인원 제한으로 인해
      ${name}님의 1차 서류 결과 불합격을 안내드리게 되었습니다.`}
      </p>

      <p className='mb-3'>{`좋은 결과를 드리지 못해 아쉬운 마음이 크지만,
      앞으로도 멋진 기회들이 많을 거라 믿습니다.
      다시 한번 지원해주셔서 감사드리며, ${name}님의 앞날을 응원하겠습니다.`}</p>
    </div>
  )
}

export const RecruitUI_FINAL: React.FC<RecruitUIProps> = ({ name }) => {
  return (
    <div className="whitespace-pre-line text-white flex flex-col items-start w-auto h-[auto] shadow-[0px_2px_3px_rgba(255,255,255,0.2)] bg-#17171B] gap-2 mx-2 font-pretendardRegular pl-2  text-[12px] ">

      <p className="pt-3 font-pretendardBold ">
        안녕하세요 {`${name}`}님, <br /> 다솜 34기에<span className='text-mainColor font-pretendardBold'> 최종합격</span> 되신 점 축하드립니다!
      </p>

      <p >{`길었던 면접 과정 간 고생 많으셨습니다.
      향후 활동 내용은 디스코드 및 카카오톡 단체 톡방을 통해
      전달 될 예정이며, 카카오톡 단체 톡방은 금일 밤 중 초대해 드릴 예정입니다.`}
      </p>

      <p className='mb-3'>
        {`다시 한번 진심으로 축하드리며,
        2025학년도 다솜 34기 멤버로서의 앞으로의 활동을 기대하겠습니다.
        수고 많으셨습니다. ☺️`}
      </p>
    </div>
  )
}

export const RecruitUI_FINAL2: React.FC<RecruitUIProps> = ({ name }) => {
  return (
    <div className="whitespace-pre-line text-white flex flex-col items-start w-auto h-[auto] shadow-[0px_2px_3px_rgba(255,255,255,0.2)] bg-#17171B] gap-2 mx-2 font-pretendardRegular pl-2 text-[12px] ">

      <p className="pt-3 ">
        {`${name}님 안녕하세요. 컴퓨터공학부 전공동아리 다솜입니다.
        먼저, 다솜 34기에 관심을 갖고 지원해 주시고 소중한 시간을 내어
        대면 인터뷰까지 함께해 주셔서 진심으로 감사드립니다.`}
      </p>

      <p >{`함께할 수 있기를 기대했지만, 모집 인원 제한으로 인해
      안타깝게도 ${name}님께 불합격 소식을 전하게 되었습니다.`}
      </p>

      <p >{`짧은 시간이었지만 ${name}님의 열정과 역량을 볼 수 있어 감사했고,
      더 좋은 기회에서 빛을 발하실 거라 믿습니다.`}
      </p>

      <p className='mb-3'>
        {`다시 한번 지원해 주셔서 감사드리며,
        앞으로의 모든 도전을 응원하겠습니다.
        수고 많으셨습니다.`}
      </p>
    </div>
  )
}