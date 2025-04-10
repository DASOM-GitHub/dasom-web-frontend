import React, { JSX, useState, useEffect, useRef } from 'react'
import headerMenu from '../../assets/images/headerMenu.svg'
import headerMenuUndo from '../../assets/images/headerMenuUndo.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Header = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isRecruiting, setIsRecruiting] = useState(false)
  const navigate = useNavigate()
  const alertShown = useRef(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  // 모집 기간 확인
  useEffect(() => {
    const checkRecruitmentPeriod = async () => {
      try {
        const response = await axios.get('https://dmu-dasom-api.or.kr/api/recruit')
        const data = response.data

        const recruitmentStart = data.find((item: any) => item.key === 'RECRUITMENT_PERIOD_START')?.value
        const recruitmentEnd = data.find((item: any) => item.key === 'RECRUITMENT_PERIOD_END')?.value

        const startDate = new Date(recruitmentStart)
        const endDate = new Date(recruitmentEnd)
        const now = new Date()

        if (now >= startDate && now <= endDate) {
          setIsRecruiting(true)
        } else {
          setIsRecruiting(false)
        }
      } catch (error) {
        console.error('모집 기간 확인 중 오류 발생:', error)
        setIsRecruiting(false)
      }
    }

    checkRecruitmentPeriod()
  }, [])

  // window width 변경 상태관리
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {/* 헤더 */}
      <div className='relative'>
        <div
          className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-4 bg-mainBlack'
          style={{
            width: windowWidth > 480 ? '395px' : '100vw',
            margin: '0 auto',
          }}
        >
          <div className='font-pretendardBlack text-mainColor text-2xl cursor-pointer' onClick={() => {
            navigate('/')
            isMenuOpen ? toggleMenu() : null
          }}>
            DASOM
          </div>

          {/* 메뉴 버튼 */}
          <img
            className='w-3 h-8 cursor-pointer'
            alt='menuButton'
            src={isMenuOpen ? headerMenuUndo : headerMenu}
            onClick={toggleMenu}
          />
        </div>
      </div>

      {/* 메뉴 팝업 */}
      {isMenuOpen && (
        <div
          className='fixed inset-0 flex flex-col items-center justify-center bg-[#17171BF5] z-40'
          style={{
            width: window.innerWidth > 480 ? '395px' : '100vw',
            height: '100vh',
            margin: '0 auto',
          }}
        >
          {/* 메뉴 리스트 */}
          <ul className='flex flex-col items-center space-y-6 text-center'>
            <li
              className='font-pretendardBlack text-mainColor text-[20px] cursor-pointer hover:text-white'
              onClick={() => {
                navigate('/')
                toggleMenu()
              }}
            >
              About
            </li>
            <li
              className='font-pretendardBlack text-mainColor text-[20px] cursor-pointer hover:text-white'
              onClick={() => {
                navigate('/news')
                toggleMenu()
              }}
            >
              News
            </li>
            <li
              className='font-pretendardBlack text-mainColor text-[20px] cursor-pointer hover:text-white'
              onClick={() => {
                navigate('/coremember')
                toggleMenu()
              }}
            >
              Members
            </li>
            <li
              className='font-pretendardBlack text-mainColor text-[20px] cursor-pointer hover:text-white'
              onClick={() => {
                navigate('/faq')
                toggleMenu()
              }}
            >
              FAQ
            </li>
            <li
              className='font-pretendardBlack text-white text-[20px] cursor-pointer hover:scale-110'
              onClick={() => {
                navigate('/somkathon')
                toggleMenu()
              }}
            >
              솜커톤 지원하기
            </li>
          </ul>
        </div>
      )}
    </>
  )
}