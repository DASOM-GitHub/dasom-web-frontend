import React from 'react'


interface RecruitHeaderProps {
  title: string;
}

export const RecruitHeader: React.FC<RecruitHeaderProps> = ({ title }) => {
  return (
    <div className=" w-full max-w-[375px] bg-[#00B493] text-white font-bold text-[11px] p-1 pl-2 ml-2.5">
      {title}
    </div>
  )
}


export const RecruitUI: React.FC = () => {
    return (     
       <div className="  text-gray-300 flex flex-col items-start max-w-[375px] h-[250px] shadow-[0px_2px_3px_rgba(255,255,255,0.2)] bg-#17171B] gap-2 ml-2.5">
        <p className="  text-[10px] font-bold pl-2 pt-2">
          다솜에서 개발자로서 성장해갈 <span className="text-yellow-400 font-bold">34기 멤버분들</span>을 찾습니다!
        </p>
        <div className="mt-2 text-[10px] pl-2">
          <p className="text-green-400 font-semibold">📅 모집 일정 :</p>
          <p>모집 폼 제출 : 2/25(화) ~ 3/14(금)</p>
          <p>대면 면접 : 3/19(수) ~ 3/21(금)</p>
          <p>최종 합격자 발표 : 3/24(월)</p>
        </div>

        <div className="mt-2 text-[10px] pl-2">
          <p className="text-green-400 font-semibold">📝 모집 대상 :
          <span className="text-gray-300 pl-1">25년도 1학기부터 다솜과 함께할 예비 다솜 멤버</span>
          </p>
        </div>

        <div className="mt-2 text-[10px] pl-2 ">
          <p className="text-green-400 font-semibold">🌿 신청 조건 :
          <span className="text-gray-300 pl-1">컴퓨터소프트웨어공학과 학생</span>
          </p>
        </div>

        <div className="mt-2 text-[10px] pl-2">
          <p className="text-green-400 font-semibold">💰 회비 :
          <span className="text-gray-300 pl-1">20,000원 </span>
          </p>
          <p> 회비는 동아리 운영자금 및 프로젝트 서버비용 지원 등에 사용됩니다. </p>
        </div>

        <p className="mt-2 text-[10px] pl-2">👀 의지가 있으며 교류를 중시하는 분을 기다립니다.</p>
      </div>
    )
}
