import React from 'react'
import { ButtonProps } from './types'

// button 컴포넌트
export const Button: React.FC<ButtonProps> = ({
  text,
  className,
  onClick,
  disabled,
}) => {
  return (
    <div className='w-full max-w-[395px] mt-20 mb-20 flex justify-center '>
      <button
        type='submit'
        className={`bg-[#00B493] max-w-[395px] h-[30px]  text-white font-pretendardBold px-4 text-[12px] transition-all ${!disabled ? 'hover:bg-[#00937A] active:scale-95' : null}  ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  )
}

export const RecruitInfo_Button:React.FC<ButtonProps> = ({text, onClick}) => {
  return(
    <>
      <button className='font-pretendardRegular bg-subGrey text-mainColor border-mainColor px-5 py-3 rounded-full border-[1px] text-xl transition-all hover:scale-110 active:scale-95' onClick={onClick}>
        {text}
      </button>
    </>
  )
}