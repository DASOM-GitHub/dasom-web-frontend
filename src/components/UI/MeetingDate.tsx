import React, { JSX } from 'react'

interface props {
  date: string
  onClick?: () => void
  isSelected?: boolean // 선택 여부
}

const getDisplatyDate = (date: string) => {
  const d = new Date(date)
  const month = (d.getMonth() + 1).toString()
  const day = d.getDate().toString()
  const week = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ][d.getDay()]
  return `${month}.${day} ${week}`
}

// 면접 날짜 선택 여부 컴포넌트
const MeetingDate = ({ date, onClick, isSelected }: props): JSX.Element => {
  return (
    <button
      className={`font-pretendardBold text-white text-center border-2 border-mainColor p-1 w-[100px] h-[35px] transition-all hover:bg-[#00937A] active:scale-95 ${isSelected ? 'bg-mainColor' : 'bg-none'}`}
      onClick={onClick}
    >
      {getDisplatyDate(date)}
    </button>
  )
}

export default MeetingDate
