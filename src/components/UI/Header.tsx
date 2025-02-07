import React from 'react'
import MobileLayout from '../layout/MobileLayout'
import headerMenu from '../../assets/images/headerMenu.svg'

export const Header = (): JSX.Element => {
    return (
        <MobileLayout>
            <div className="ml-[17px] pt-[53px] w-[93px] h-8 font-black text-mainColor text-2xl">
                DASOM
            </div>

            <img
                className='relative w-3 h-[9px] top-[12px] left-[351px]' 
                alt="headerMenu"
                src={headerMenu}
            />
        </MobileLayout>
    )
}