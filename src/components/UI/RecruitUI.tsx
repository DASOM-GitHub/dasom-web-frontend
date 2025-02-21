import React from 'react'

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
  return (
    <div className="text-white font-pretendardRegular flex flex-col text-[12px] items-start max-w-[375px] shadow-[0px_2px_3px_rgba(255,255,255,0.2)] bg-#17171B] gap-2 ml-2.5">
      <p className="pl-2 pt-2">
        <span className='font-pretendardBold'>다솜</span>에서 개발자로서 성장해갈 <span className="text-yellow-400 font-pretendardBold">34기 멤버분들</span>을 찾습니다!
      </p>
      <div className="mt-2 pl-2">
        <p className="text-green-400 font-pretendardSemiBold">📅 모집 일정 :</p>
        <p>모집 폼 제출 : 2/25(화) ~ 3/14(금)</p>
        <p>대면 면접 : 3/19(수) ~ 3/21(금)</p>
        <p>최종 합격자 발표 : 3/24(월)</p>
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
    <div className="  text-white flex flex-col items-start max-w-[375px] h-[auto] shadow-[0px_2px_3px_rgba(255,255,255,0.2)] bg-#17171B] gap-2 ml-2.5 font-pretendardRegular pl-2 pr-2 text-[12px] ">

      {/* 1차 서류 합격 안내 */}
      <p className="text-[15px] font-pretendardBold text-yellow-300 pt-3">
        🎊 1차 서류 합격을 진심으로 축하드립니다!
      </p>
      <p>
        2차 면접이 진행될 예정입니다. <br/> 아래에서 <span className="text-green-400 font-pretendardBold">편하신 날짜와 시간을 선택하여 예약</span>해주세요.
      </p>

      {/* 면접 일정 */}

      <p className="text-green-400 font-pretendardSemiBold text-sm mt-2">📅 면접 일정</p>
      <p className="text-xs">✔ 3월 19일(수) ~ 3월 21일(금)</p>


      {/* 면접 장소 */}

      <p className="text-green-400 font-pretendardSemiBold text-sm mt-2">🕒 면접 장소</p>
      <p className="text-xs">✔ 개별 안내 예정</p>


      {/* 추가 안내 사항 */}

      <p className="text-yellow-300 font-pretendardSemiBold text-sm mt-2">📌 면접 안내 사항</p>
      <p className="text-xs">✅ 면접은 <span className="font-pretendardSemiBold">개별 면접</span>으로 진행됩니다.</p>
      <p className="text-xs">✅ <span className="font-pretendardSemiBold">예약 변경은 불가</span>하므로 신중히 선택해주세요.</p>
      <p className="text-xs">✅ 선착순 마감으로 <span className="font-pretendardSemiBold">일부 시간대는 예약이 어려울 수 있습니다.</span></p>


      <p className="mt-4 text-[12px] text-white mb-3">
        🔔 면접 당일 <span className="text-yellow-300 font-pretendardSemiBold">지각 없이 참석</span> 부탁드립니다.
        <p>💡 면접 일정은 선착순으로 마감되므로 빠른 예약을 권장드립니다! 😊</p>
      </p>

    </div>
  )
}

