import React, { JSX, useState, useEffect, use } from 'react'
import MobileLayout from '../layout/MobileLayout'
import headerMenu from '../../assets/images/headerMenu.svg'
import headerMenuUndo from '../../assets/images/headerMenuUndo.svg'
import { useNavigate } from 'react-router-dom'

export const Header = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

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
          <div className='font-black text-mainColor text-2xl cursor-pointer' onClick={() => {
            navigate('/')
            isMenuOpen? toggleMenu() : null
            }}>DASOM</div>

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
              onClick={() => {console.log('About 이동')
                navigate('/')
                toggleMenu()
              }}
            >
              About
            </li>
            <li
              className='font-pretendardBlack text-mainColor text-[20px] cursor-pointer hover:text-white'
              onClick={() => {console.log('News 이동')
                navigate('/news')
                toggleMenu()
              }}
            >
              News
            </li>
            <li
              className='font-pretendardBlack text-mainColor text-[20px] cursor-pointer hover:text-white'
              onClick={() =>{console.log('Members 이동')
                navigate('/coremember')
                toggleMenu()
              }}
            >
              Members
            </li>
            <li
              className='font-pretendardBlack text-mainColor text-[20px] cursor-pointer hover:text-white'
              onClick={() => {console.log('FAQ 이동')
                navigate('/faq')
                toggleMenu()
              }}
            >
              FAQ
            </li>
            <li
              className='font-pretendardBlack text-white text-[20px] cursor-pointer hover:scale-110'
              onClick={() => {console.log('form 이동')
                navigate('/recruit')
                toggleMenu()
              }}
            >
              34기 지원하기
            </li>
            <li
              className='font-pretendardBlack text-white text-[20px] cursor-pointer hover:scale-110'
              onClick={() => {console.log('합격여부 이동')
                navigate('/')
                toggleMenu()
              }}
            >
              합격여부 확인하기
            </li>
          </ul>
        </div>
      )}
    </>
  )
}