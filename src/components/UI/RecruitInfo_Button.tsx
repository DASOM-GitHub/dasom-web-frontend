import React from 'react'
import { ButtonProps } from './types'

export const RecruitInfo_Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <>
      <button
        className={`font-pretendardRegular px-5 py-3 rounded-full border-[1px] text-xl transition-all ${
          disabled
            ? 'bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed'
            : 'bg-subGrey text-mainColor border-mainColor hover:scale-110 active:scale-95'
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  )
}
