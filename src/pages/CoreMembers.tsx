import React, { useState } from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import dasomLogo from '../assets/images/dasomLogo.svg'
import { motion } from 'framer-motion'

interface Profile {
  id: number;
  name: string;
  roll: string;
  github_username: string;
}

const profiles: Profile[] = [
  { id: 1, name: '윤도훈', roll: '회장', github_username: 'hodoon' },
  { id: 2, name: '공석', roll: '부회장', github_username: '' },
  { id: 3, name: '유승완', roll: '기술팀장', github_username: 'ysw789' },
  { id: 4, name: '최도현', roll: '학술팀장', github_username: 'titeotty' },
  { id: 5, name: '공석', roll: '학술차장', github_username: '' },
  { id: 6, name: '김수현', roll: '홍보팀장', github_username: 'sooh329' },
  { id: 7, name: '임성환', roll: '서기', github_username: 'limtjdghks' },
  { id: 8, name: '김태우', roll: '총무', github_username: 'kim3360' },
  { id: 9, name: '공석', roll: '부총무', github_username: '' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: 'easeOut',
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, willChange: 'transform, opacity' }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
}

const ProfileCard = ({ member }: { member: Profile }) => {
  const [isClicked, setIsClicked] = useState(false)

  return (
    <motion.div
      key={member.id}
      className={`flex mb-[16px] items-center justify-between pr-[12px] p-3 rounded-lg transition-all cursor-pointer
        ${isClicked ? 'shadow-xl' : 'shadow-lg'}`} 
      variants={itemVariants}
      whileHover={{ scale: 1.05, boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.2)' }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsClicked(!isClicked)}
    >
      <div className="flex items-center">
        <GitHubProfileImage username={member.github_username} width={40} height={40} />
        <div className='font-pretendardSemiBold text-[16px] ml-[12px] w-[50px]'>{member.name}</div>
        <div className='font-pretendardRegular text-[12px] ml-[12px] w-[50px]'>{member.roll}</div>
      </div>
      <GitHubLinkUrl username={member.github_username} />
    </motion.div>
  )
}

// 깃허브 프로필 사진
const GitHubProfileImage = ({ username, width, height }: { username: string, width: number, height: number }) => {
  return username ? (
    <motion.img
      src={`https://github.com/${username}.png`}
      alt="gitHubProfile"
      width={width}
      height={height}
      className='rounded-full'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    />
  ) : (
    <div className='w-[40px] h-[40px] bg-black rounded-full flex items-center justify-center'>
      <img className='w-[14px] h-[16px]' src={dasomLogo} />
    </div>
  )
}

// 깃허브 링크 버튼
const GitHubLinkUrl = ({ username }: { username: string }) => {
  return username ? (
    <motion.div
      className='flex bg-white rounded-[6px] p-[4px] transition-all'
      whileHover={{ x: 3 }}
      whileTap={{ x: 5 }}
    >
      <GitHubProfileImage username={username} width={12} height={12} />
      <a
        className='block cursor-pointer text-black text-[8px] ml-[4px] font-pretendardSemiBold no-underline'
        href={`https://github.com/${username}`}
        target='_blank'
        rel="noopener noreferrer"
      >
        {username}'s Github
      </a>
    </motion.div>
  ) : <div />
}

const CoreMembers: React.FC = () => {
  return (
    <MobileLayout>
      <div className='mt-16 ml-[12px] flex'>
        <img className='w-[21px] h-[24px] cursor-pointer' alt='logo' src={dasomLogo} />
        <div className='font-pretendardSemiBold text-white text-[16px] ml-[9px]'>
          다솜 운영진
        </div>
      </div>
      
      {/* 애니메이션 컨테이너 */}
      <motion.div 
        className='ml-[12px] mt-[20px] text-white'
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
      >
        {profiles.map((member) => (
          <ProfileCard key={member.id} member={member} />
        ))}
      </motion.div>
      <div className='flex w-full bg-mainBlack min-h-[100px]' />
    </MobileLayout>
  )
}

export default CoreMembers