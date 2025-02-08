import React from 'react'
import headerMenu from '../../assets/images/headerMenu.svg'

export const Header = (): JSX.Element => {
    return (
        <div className="flex justify-between items-center px-4 py-4">
            <div className="font-black text-mainColor text-2xl">
                DASOM
            </div>

            <img
                className="w-3 h-[9px]" 
                alt="headerMenu"
                src={headerMenu}
            />
        </div>
    )
}
