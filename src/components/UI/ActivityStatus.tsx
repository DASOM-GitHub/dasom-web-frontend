import React from 'react'
import { motion } from 'framer-motion'
import DasomLogo from '../../assets/images/dasomLogo.svg'
import ActivityBar from '../../assets/images/activityBar.svg'
import { ActivityStatusProps, ActivitySection } from './types'

// 페이드 인 및 위로 이동 애니메이션
const FadeInSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  )
}

const ActivityStatus: React.FC<ActivityStatusProps> = ({ 
  year, 
  activityData: customActivityData,
  className = ''
}) => {
  // 2024년도 기본 활동 데이터
  const defaultActivityData2024: ActivitySection[] = [
    {
      category: '코엑스 한국전자전',
      items: [
        {
          award: '장려상',
          subtitle: '2024 동양미래 EXPO',
        },
      ],
    },
    {
      category: '외부 경진대회 / 전시회',
      items: [
        {
          award: '동상',
          subtitle: '교육장비 개발 및 아이디어 경진대회',
        },
      ],
    },
    {
      category: '교내 경진대회',
      items: [
        {
          award: '최우수상',
          subtitle: '컴퓨터 공학부 경진대회',
        },
      ],
    },
    {
      category: '세미나 실적',
      items: [
        { title: '현직 백엔드 개발자 특강 - ', subtitle: '20명 대상' },
        { title: '웹 개발 세미나 - ', subtitle: '10명 대상' },
      ],
    },
    {
      category: '기타 활동',
      items: [
        { title: '컴퓨터공학부 최초 해커톤 개최' },
        { title: '전공동아리 내부 팀 프로젝트 발표회 개최' },
        { title: 'DASOM MAKERS 스터디 및 홈페이지 제작' },
        { title: '시험기간 간식 행사' },
        { title: '할로윈 행사' },
        { title: '동계, 하계 MT' },
      ],
    },
  ]

  // 2025년도 기본 활동 데이터
  const defaultActivityData2025: ActivitySection[] = [
    {
      category: '신규 프로젝트',
      items: [
        {
          title: 'NFT 기반 타임캡슐 서비스 - ',
          subtitle: ' 기획, 디자인 및 시연',
        },
      ],
    },
    {
      category: '세미나 및 워크샵',
      items: [
        { title: '나의 커리어 디자인하기 - 나에게 맞는 회사 고민하기, 성장 전략은? ', subtitle: ' ' },
      ],
    },
    {
      category: '대회 참가',
      items: [
        {
          award: '장려상 ',
          subtitle: '생성형 AI를 활용한 문제해결 해커톤',
        },
      ],
    },
    {
      category: '2025년 기타 활동',
      items: [
        { title: '스프링 부트, 팀 프로젝트 기획 개발 스터디 그룹 운영' },
        { title: '컴퓨터공학부 + 시각디자인학부 협업 해커톤 개최' },
        { title: '대학생 IT 연합동아리 DND, UMC 활동' },
        { title: '오픈소스 프로젝트 기여 활동' },
        { title: '2025년 동계 MT 계획' },
        { title: '미니퀴즈 간식행사' },
      ],
    },
  ]

  // 커스텀 데이터가 있으면 사용하고, 없으면 연도에 따른 기본 데이터 사용
  const data = customActivityData || (year === '2025' ? defaultActivityData2025 : defaultActivityData2024)

  return (
    <FadeInSection>
      <div className={`max-w-[400px] bg-mainBlack p-4 rounded-xl text-white ${className}`}>
        <div className='flex items-center gap-2 mb-3'>
          <img src={DasomLogo} className='w-7 h-7' alt='Dasom Icon' />
          <div>
            <div className='text-[16px] font-pretendardBold'>활동 현황</div>
            <div className='text-mainColor text-[13px] font-pretendardSemiBold'>
              {year}
            </div>
          </div>
        </div>
        <div className='flex items-start gap-3'>
          <img
            src={ActivityBar}
            className='w-4 h-[300px] mt-1.5'
            alt='Activitybar'
          />
          <div className='space-y-3'>
            {data.map((section, index) => (
              <FadeInSection key={index}>
                <div>
                  <div className='text-white text-[12px] font-pretendardBold'>
                    {section.category}
                  </div>
                  <ul className='space-y-1'>
                    {section.items.map((activity, idx) => (
                      <li
                        key={idx}
                        className='flex flex-wrap text-[10.5px] leading-tight'
                      >
                        {activity.title && (
                          <span className='font-pretendardRegular'>
                            {activity.title}
                          </span>
                        )}
                        {activity.award && (
                          <span className='font-pretendardBold text-mainColor mr-1'>
                            {activity.award}
                          </span>
                        )}
                        {activity.subtitle && (
                          <span className='text-subGrey font-pretendardRegular'>
                            {' '}
                            {activity.subtitle}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export default ActivityStatus
