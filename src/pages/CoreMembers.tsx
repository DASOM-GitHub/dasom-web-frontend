import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import githubIcon from '../assets/images/github.png'
import { useMediaQuery } from 'react-responsive'
import dasombanner from '../assets/images/dasombanner.png'
import Banner from '../components/common/Banner'
import presidentImage from '../assets/images/source/image.png'
import techLeadImage from '../assets/images/source/image 7.png'
import vicePresidentImage from '../assets/images/source/image 7-7.png'
import academicLeadImage from '../assets/images/source/image 7-6.png'
import secretaryImage from '../assets/images/source/image 7-5.png'
import academicViceLeadImage from '../assets/images/source/image 7-4.png'
import managerImage from '../assets/images/source/image 7-3.png'
import viceManagerImage from '../assets/images/source/image 7-2.png'
import prLeadImage from '../assets/images/source/image 7-1.png'
import apiClient from '../utils/apiClient'

interface TeamMember {
  id: number
  name: string
  position: string
  role: string
  github_username: string
  team: keyof typeof TEAM_DESCRIPTIONS
  sortOrder: number | null
}

const TEAM_DESCRIPTIONS = {
  PRESIDENT: '동아리 운영 총괄, 기획 및 각 부서 업무 관리',
  TECH: '동아리 주요 프로젝트 개발 및 유지보수',
  ACADEMIC: '스터디 및 해커톤 관리·운영, 학술 자료 정리 및 배포',
  PR: '동아리 SNS, 홍보물 제작, 각종 행사 홍보',
  MANAGEMENT: '비품 및 회비 관리, 동아리 재정 관리, 회의록 정리',
} as const

const teamMembers: TeamMember[] = [
  // 회장단
  {
    id: 1,
    name: '윤도훈',
    position: '회장',
    role: '동아리 운영 총괄',
    github_username: 'hodoon',
    team: 'PRESIDENT',
    sortOrder: 1,
  },
  {
    id: 2,
    name: '유시영',
    position: '부회장',
    role: '동아리 운영 보조',
    github_username: '',
    team: 'PRESIDENT',
    sortOrder: 2,
  },
  // 기술팀
  {
    id: 3,
    name: '유승완',
    position: '기술팀장',
    role: '기술부장',
    github_username: 'ysw789',
    team: 'TECH',
    sortOrder: 3,
  },
  // 학술팀
  {
    id: 4,
    name: '최도현',
    position: '학술팀장',
    role: '학술부장',
    github_username: 'dohy-eon',
    team: 'ACADEMIC',
    sortOrder: 4,
  },
  {
    id: 5,
    name: '주천수',
    position: '학술차장',
    role: '학술부차장',
    github_username: '',
    team: 'ACADEMIC',
    sortOrder: 5,
  },
  // 홍보팀
  {
    id: 6,
    name: '김수현',
    position: '홍보팀장',
    role: '홍보부장',
    github_username: 'sooh329',
    team: 'PR',
    sortOrder: 6,
  },
  // 운영총무팀
  {
    id: 7,
    name: '임성환',
    position: '서기',
    role: '서기',
    github_username: 'limtjdghks',
    team: 'MANAGEMENT',
    sortOrder: 7,
  },
  {
    id: 8,
    name: '김태우',
    position: '총무',
    role: '총무',
    github_username: 'kim3360',
    team: 'MANAGEMENT',
    sortOrder: 8,
  },
  {
    id: 9,
    name: '조영주',
    position: '부총무',
    role: '부총무',
    github_username: '',
    team: 'MANAGEMENT',
    sortOrder: 9,
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const MemberCard = ({ member }: { member: TeamMember }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState('')

  useEffect(() => {
    const img = new Image()
    const src = (() => {
      switch (member.position) {
        case '회장':
          return presidentImage
        case '기술팀장':
          return techLeadImage
        case '부회장':
          return vicePresidentImage
        case '학술팀장':
          return academicLeadImage
        case '서기':
          return secretaryImage
        case '학술차장':
          return academicViceLeadImage
        case '총무':
          return managerImage
        case '부총무':
          return viceManagerImage
        case '홍보팀장':
          return prLeadImage
        default:
          return `https://avatars.githubusercontent.com/${
            member.github_username || 'github'
          }`
      }
    })()

    img.src = src
    img.onload = () => {
      setImageSrc(src)
      setIsImageLoaded(true)
    }
    img.onerror = () => {
      setImageSrc('https://placehold.co/400x400/10b981/ffffff?text=DASOM')
      setIsImageLoaded(true)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [member.position, member.github_username])

  const hasGithub = !!member.github_username

  return (
    <motion.div
      className='bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-mainColor transition-all duration-300 flex flex-col h-full'
      variants={fadeIn}
      whileHover={{
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.1)',
      }}
    >
      <div className='flex-1 flex flex-col'>
        <div
          className={`relative w-full pt-[100%] mb-4 rounded-lg overflow-hidden transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={imageSrc}
            alt={member.name}
            className='absolute top-0 left-0 w-full h-full object-cover'
            loading='lazy'
            decoding='async'
          />
        </div>
        {!isImageLoaded && (
          <div className='w-full pt-[100%] mb-4 rounded-lg bg-gray-700 animate-pulse' />
        )}
        <div className='flex justify-between items-start'>
          <div>
            <h3 className='text-2xl font-bold text-white'>
              {member.name} • {member.position}
            </h3>
            <p className='text-mainColor'>{member.role}</p>
          </div>
          {hasGithub && (
            <a
              href={`https://github.com/${member.github_username}`}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/50 hover:bg-white transition-colors'
              aria-label={`${member.name}의 GitHub 프로필 보기`}
            >
              <img src={githubIcon} alt='GitHub' className='w-10 h-10' />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const TeamSection = ({
  title,
  members,
  description,
}: {
  title: string
  members: TeamMember[]
  description?: string
}) => {
  return (
    <motion.div className='mb-16 md:mb-24' variants={fadeIn}>
      <h2 className='text-3xl md:text-4xl font-bold text-center mb-4 text-white font-pretendardBold'>
        {title}
      </h2>
      {description && (
        <p className='text-center text-white/80 text-lg mb-8 max-w-3xl mx-auto  font-pretendardRegular'>
          {description}
        </p>
      )}
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8'
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
      >
        {members.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </motion.div>
    </motion.div>
  )
}

const CoreMembers = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true)
        const response = await apiClient.get('/executives')
        setTeamMembers(response.data)
      } catch (error) {
        console.error('Failed to fetch team members:', error)
        // 에러 발생 시 기본 데이터 사용
        setTeamMembers(teamMembers)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTeamMembers()
  }, [])

  const teamGroups = teamMembers.reduce((groups, member) => {
    if (!groups[member.team]) {
      groups[member.team] = []
    }
    groups[member.team].push(member)
    return groups
  }, {} as Record<TeamMember['team'], TeamMember[]>)

  const teamOrder: TeamMember['team'][] = [
    'PRESIDENT',
    'TECH',
    'ACADEMIC',
    'PR',
    'MANAGEMENT',
  ]
  const teamTitles = {
    PRESIDENT: '회장단',
    TECH: '기술팀',
    ACADEMIC: '학술팀',
    PR: '홍보팀',
    MANAGEMENT: '운영총무팀',
  } as const

  // 로딩 중일 때 로딩 화면 표시
  if (isLoading) {
    return (
      <main className='w-full bg-[#17171B] flex flex-col items-center pb-20 min-h-screen'>
        <Banner
          imageUrl={dasombanner}
          title='DASOM'
          subtitle='다솜의 운영진을 소개합니다.'
        />
      </main>
    )
  }

  return (
    <main className='w-full bg-[#17171B] flex flex-col items-center pb-20 min-h-screen'>
      <Banner
        imageUrl={dasombanner}
        title='DASOM'
        subtitle='다솜의 운영진을 소개합니다.'
      />

      {/* Teams Section */}
      <section className='w-full flex justify-center'>
        <div className='w-full max-w-6xl px-4'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className='space-y-24 mt-[60px] md:mt-[100px] mb-10'
          >
            {teamOrder.map(teamId => (
              <TeamSection
                key={teamId}
                title={teamTitles[teamId]}
                members={teamGroups[teamId] || []}
                description={TEAM_DESCRIPTIONS[teamId]}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default CoreMembers
