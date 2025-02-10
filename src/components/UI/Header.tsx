import React, { useState } from 'react'
import MobileLayout from '../layout/MobileLayout'
import headerMenu from '../../assets/images/headerMenu.svg'
import headerMenuUndo from '../../assets/images/headerMenuUndo.svg'

export const Header = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className='flex justify-between items-center px-4 py-4 bg-mainBlack relative'>
      <MobileLayout>
        <div className='flex justify-between px-4 py-4'>
          <div className='font-black text-mainColor text-2xl'>DASOM</div>

          {/* 메뉴 버튼 (팝업이 떠 있어도 유지됨) */}
          <img
            className='w-3 h-7 cursor-pointer z-50 relative'
            alt='menuButton'
            src={isMenuOpen ? headerMenuUndo : headerMenu}
            onClick={toggleMenu}
          />
        </div>

        {/* 메뉴 팝업 */}
        {isMenuOpen && (
          <div className='absolute flex flex-col items-center justify-center bg-[#17171BF5] w-[375px] h-[720px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>

            {/* 메뉴 리스트 */}
            <ul className='flex flex-col items-center space-y-6 text-center'>
              <li
                className='font-pretendardBlack text-mainColor text-[20px] cursor-pointer hover:text-white'
                onClick={() => console.log('About 이동')}
              >
                About
              </li>
              <li
                className='font-pretendardBlack text-mainColor text-[20px] cursor-pointer hover:text-white'
                onClick={() => console.log('News 이동')}
              >
                News
              </li>
              <li
                className='font-pretendardBlack text-mainColor text-[20px] cursor-pointer hover:text-white'
                onClick={() => console.log('Members 이동')}
              >
                Members
              </li>
              <li
                className='font-pretendardBlack text-mainColor text-[20px] cursor-pointer hover:text-white'
                onClick={() => console.log('FAQ 이동')}
              >
                FAQ
              </li>
              <li
                className='font-pretendardBlack text-white text-[20px] cursor-pointer hover:scale-110'
                onClick={() => console.log('form 이동')}
              >
                34기 지원하기
              </li>
              <li
                className='font-pretendardBlack text-white text-[20px] cursor-pointer hover:scale-110'
                onClick={() => console.log('합격여부 이동')}
              >
                합격여부 확인하기
              </li>
            </ul>
          </div>
        )}
      </MobileLayout>
    </div>
  )
}