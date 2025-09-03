import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

// 메뉴 버튼 컴퍼넌트
const AdminMenuBtn = ({ text, link }: { text: string; link: string }) => {
  const navigate = useNavigate()

  return (
    <div
      className='cursor-pointer w-[420px] bg-mainColor text-center py-[9px] rounded-[6px] hover:bg-[#278573]'
      onClick={() => navigate(link)}
    >
      {text}
    </div>
  )
}

const AdminMain: React.FC = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      logout()
      navigate('/')
    } catch (error) {
      console.error('로그아웃 중 오류 발생', error)
    }
  }

  return (
    <div className='h-[100vh] w-[100vw] bg-mainBlack'>
      <div className='h-[100%] flex flex-col items-center justify-center space-y-4 text-[16px] text-white font-pretendardSemiBold'>
        <AdminMenuBtn text='회원 관리' link='/admin/members' />
        <AdminMenuBtn text='지원자 관리' link='/admin/applicants' />
        <AdminMenuBtn text='일정 관리' link='/admin/date' />
        <AdminMenuBtn text='공지사항 관리' link='/admin/news' />
        <AdminMenuBtn text='솜커톤 지원자 관리' link='/admin/somkathon' />
        <div
          className='cursor-pointer text-[14px] font-pretendardRegular text-white'
          onClick={handleLogout}
        >
          로그아웃
        </div>
      </div>
    </div>
  )
}

export default AdminMain
