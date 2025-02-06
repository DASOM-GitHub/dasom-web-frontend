import PropTypes from 'prop-types'
import React from 'react'
import MobileLayout from '../layout/MobileLayout'
import headerMenu from '../../assets/images/headerMenu.svg'

interface Props {
    prop: 'default'
    className: any
}

export const Header = ({prop, className} : Props): JSX.Element => {
    return (
        <MobileLayout>
            <div className="absolute w-[93px] h-8 top-[52px] left-[17px] [font-family:'Pretendard_Variable-Black', Helvetica] font-black text-mainColor text-2xl tracking[0] leading-[normal]">
                DASOM
            </div>

            <img
                className='absolute w-3 h-[9px] top-16 left-[351px]' 
                alt="headerMenu"
                src={headerMenu}
            />
        </MobileLayout>
    )
}