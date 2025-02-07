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
        <MobileLayout>
            <div className='ml-[17px] pt-[53px] w-[93px] h-8 font-pretendardBlack text-mainColor text-2xl'>
                DASOM
            </div>

            {/* 메뉴 버튼 */}
            <img
                className='relative w-3 h-[9px] top-[12px] left-[351px] cursor-pointer'
                alt='headerMenu'
                src={headerMenu}
                onClick={toggleMenu}
            />

            {/* 메뉴 팝업 */}
            {isMenuOpen && (
                <div className='relative top-[-2px] w-[375px] h-[720px] bg-[#17171BF5]'>
                    <img
                        className='relative w-3 h-3 left-[351px]'
                        alt='headerMenuUndo'
                        src={headerMenuUndo}
                        onClick={toggleMenu}
                    />
                    <ul className='relative'>
                        <li className="relative top-[152px] font-pretendardBlack text-mainColor text-[20px] text-center" onClick={() => console.log('About 이동')}>
                            About
                        </li>
                        <li className="relative top-[164px] font-pretendardBlack text-mainColor text-[20px] text-center" onClick={() => console.log('news 이동')}>
                            News
                        </li>
                        <li className="relative top-[176px] font-pretendardBlack text-mainColor text-[20px] text-center" onClick={() => console.log('members 이동')}>
                            Members
                        </li>
                        <li className="relative top-[188px] font-pretendardBlack text-mainColor text-[20px] text-center" onClick={() => console.log('faq 이동')}>
                            FAQ
                        </li>
                        <li className="relative top-[200px] font-pretendardBlack text-[#ffffff] text-[20px] text-center" onClick={() => console.log('form 이동')}>
                            34기 지원하기
                        </li>
                        <li className="relative top-[212px] font-pretendardBlack text-[#ffffff] text-[20px] text-center" onClick={() => console.log('합격여부 이동')}>
                            합격여부 확인하기
                        </li>
                    </ul>
                </div>
            )}
        </MobileLayout>
    )
}