import React, { JSX } from 'react'
import { MeetingTimeProps } from '../../types/meeting'

// 면접 시간 선택 버튼 컴포넌트
const MeetingTime = ({
  time,
  onClick,
  isSelected,
  disabled,
}: MeetingTimeProps): JSX.Element => {
  return (
    <button
      className={`font-pretendardBold text-white rounded-3xl text-center border-2 border-mainColor w-[80px] h-[40px] ${isSelected ? 'bg-mainColor' : 'bg-none'} ${
        disabled
          ? 'opacity-30 border-subGrey2 text-subGrey'
          : 'transition-all hover:bg-[#00937A] active:scale-95'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {time}
    </button>
  )
}

export default MeetingTime
