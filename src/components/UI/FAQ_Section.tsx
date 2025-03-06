import React from 'react'
import { motion } from 'framer-motion' // 애니메이션 라이브러리 추가
import dasomLogo from '../../assets/images/dasomLogo.svg'

interface FAQItemProps {
  question: string
  answer: string
  alignment: string
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, alignment }) => {
  return (
    <motion.div
      className={`p-3 rounded-[11px] bg-[#26262D] w-[275px] shadow-[0px_2px_3px_rgba(0,180,147,0.5)] 
      ${alignment} transition-all duration-300 hover:scale-105 hover:bg-[#000]`}
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
    >
      <h3 className='font-pretendardBold text-[#00B493] text-[16px] transition-all duration-300'>{question}</h3>
      <p className="mt-2 text-[12px] leading-relaxed whitespace-pre-line">{answer}</p>
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: 'easeOut',
    }
  }
}

const FAQSection: React.FC = () => {
  return (
    <motion.section
      className="font-pretendardRegular text-[#FFFFFF] p-4 rounded-lg shadow-lg mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* FAQ 리스트 */}
      <div className="space-y-8 flex flex-col items-center">
        <FAQItem
          question="Q. 팀 프로젝트는 어떻게 진행되나요?"
          answer={`동아리 내의 다른 멤버들과 팀 빌딩을 진행한 뒤, 
          팀별로 각자 작업물을 만들고, 추후 데모데이를 통해 
          각 팀의 작업물을 발표하는 방식으로 진행됩니다.`}
          alignment='self-start'
        />
        <FAQItem
          question="Q. 동아리 지원은 어떻게 하나요?"
          answer={`우측 상단 메뉴에 34기 지원하기 클릭 후 지원 폼 
          작성을 통해 지원이 가능합니다.`}
          alignment='self-end'
        />
        <FAQItem
          question="Q. 프로젝트 경험이 있어야 하나요?"
          answer={`프로젝트 경험이 없어도, 개발에 능숙하지 않아도, 
          하고자 하는 의지가 있으신 분이라면 
          누구나 동아리 가입이 가능해요!`}
          alignment='self-start'
        />
        <FAQItem
          question="Q. 복학생도 가입이 가능한가요?"
          answer={`네, 컴퓨터소프트웨어공학과 학생이라면 누구나 가입이 가능해요. 
          복학생 역시 가능합니다.`}
          alignment='self-end'
        />
      </div>
    </motion.section>
  )
}

export default FAQSection