import React from 'react'
import { ButtonProps } from './types'

export const RecruitInfo_Button:React.FC<ButtonProps> = ({text, onClick}) => {
    return(
      <>
        <button className='font-pretendardRegular bg-subGrey text-mainColor border-mainColor px-5 py-3 rounded-full border-[1px] text-xl transition-all hover:scale-110 active:scale-95' onClick={onClick}>
          {text}
        </button>
      </>
    )
  }