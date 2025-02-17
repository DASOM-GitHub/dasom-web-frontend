import React from 'react'
import dasomLogo from '../../assets/images/dasomLogo.svg'


interface FAQItemProps {
  question: string
  answer: string
  alignment: string
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, alignment }) => {
  return (
    <div className={` p-3 rounded-[11px] bg-[#26262D]  w-[266px] shadow-[0px_2px_3px_rgba(0,180,147,0.5)] ${alignment}`}>
      <h3 className='font-pretendardBold text-[#00B493] text-[12px]'>{question}</h3>
      <p className=" mt-2 text-[10px] leading-relaxed whitespace-pre-line">{answer}</p>
    </div>
  )
}

const FAQSection: React.FC = () => {
  return (
    <section className="font-pretendardRegular text-[#FFFFFF] p-4 rounded-lg shadow-lg mx-auto mt-[60px] ">

      {/* 제목 */}
      <div className='w-full flex items-start gap-2 mb-3'>
        <img src={dasomLogo} alt="Dasom Logo" className="w-6 h-6 mt-0.5" />
        <div>
          <h2 className="text-[16px] font-pretendardBold leading-tight">FAQ / 자주 묻는 질문</h2>
          <p className="text-[#A8A8A8] text-[10px] leading-tight">찾으시는 질문이 없다면 다솜 인스타그램 DM 문의를 이용해 주세요.</p>
        </div>
      </div>

      {/* FAQ 리스트 */}
      <div className="space-y-5 flex flex-col items-center">
        <FAQItem
          question="Q. 팀 프로젝트는 어떻게 진행되나요?"
          answer={`동아리 내의 다른 멤버들과 팀 빌딩을 진행한 뒤, 
          팀별로 각자 작업을 만들고, 추후 데모데이를 통해 
          각 팀의 작업물을 발표하는 방식으로 진행됩니다.`}
          alignment="self-start"

        />

        <FAQItem
          question="Q. 가입은 어떻게 하나요?"
          answer={`아래 네비게이션 바의 중에 비행기를 눌러 신청 폼을 통해 
          가입 신청이 가능합니다.`}
          alignment="self-end"

        />

        <FAQItem
          question="Q. 프로젝트 경험이 있어야 하나요?"
          answer={`프로젝트 경험이 없어도, 개발에 능숙하지 않아도, 
          하고자 하는 의지가 있으신 분이라면 누구나 동아리 가입이 
          가능해요!`}
          alignment="self-start"

        />

        <FAQItem
          question="Q. 복학생도 가입이 가능한가요?"
          answer={`네, 컴퓨터공학과 학생이라면 누구나 가입이 가능해요. 
          복학생 역시 가능합니다.`}
          alignment="self-end"

        />
      </div>
    </section>
  )
}

export default FAQSection
