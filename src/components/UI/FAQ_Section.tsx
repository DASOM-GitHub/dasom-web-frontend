import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion' // 애니메이션 라이브러리 추가
import { FAQItemProps } from './types'

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, alignment }) => {
  return (
    <motion.div
      className={`p-3 rounded-[11px] bg-[#26262D] w-full shadow-[0px_2px_3px_rgba(0,180,147,0.5)]
      ${alignment} md:self-start transition-all duration-300 hover:scale-105 hover:bg-[#000]`}
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
    >
      <h3 className='font-pretendardBold text-[#00B493] text-xl transition-all duration-300'>
        {question}
      </h3>
      <p className='mt-2 text-base leading-relaxed whitespace-pre-line'>
        {answer}
      </p>
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
    },
  },
}

const FAQSection: React.FC = () => {
  const [faqData, setFaqData] = useState<
    Array<{ id?: number; question: string; answer: string }>
  >([])

  useEffect(() => {
      setFaqData([
        {
          id: 1,
          question: '팀 프로젝트는 어떻게 진행되나요?',
          answer:
            '동아리 내의 다른 멤버들과 팀 빌딩을 진행한 뒤, 팀별로 각자 작업물을 만들고, 추후 데모데이를 통해 각 팀의 작업물을 발표하는 방식으로 진행됩니다.',
        },
        {
          id: 2,
          question: '동아리 지원은 어떻게 하나요?',
          answer:
            '우측 상단 메뉴에 35기 지원하기 클릭 후 지원 폼 작성을 통해 지원이 가능합니다.',
        },
        {
          id: 3,
          question: '프로젝트 경험이 있어야 하나요?',
          answer:
            '프로젝트 경험이 없어도, 개발에 능숙하지 않아도, 하고자 하는 의지가 있으신 분이라면 누구나 동아리 가입이 가능해요!',
        },
        {
          id: 4,
          question: '복학생도 가입이 가능한가요?',
          answer:
            '네, 컴퓨터소프트웨어공학과 학생이라면 누구나 가입이 가능해요. 복학생 역시 가능합니다.',
        },
      ])
  }, [])
  return (
    <motion.section
      className='w-full font-pretendardRegular text-[#FFFFFF] py-4 rounded-lg'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* FAQ 리스트: 모바일 1열 → 데스크톱 2열 → 큰 화면 4열 (짝수 열 유지) */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 md:gap-20'>
        {faqData.map((item, idx) => (
          <FAQItem
            key={item.id ?? idx}
            question={`Q. ${item.question}`}
            answer={item.answer}
            alignment={idx % 2 === 0 ? 'self-start' : 'self-end'}
          />
        ))}
      </div>
    </motion.section>
  )
}

export default FAQSection
