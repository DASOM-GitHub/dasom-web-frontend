import React, { JSX } from 'react'

interface props {
	month: string
	day: string
	week: string
	onClick?: () => void
	isSelected?: boolean // 선택 여부 
}

// 면접 날짜 선택 여부 컴포넌트 
const MeetingDate = ({ month, day, week, onClick, isSelected }: props): JSX.Element => {
	return (
		<button className={`font-pretendardBold text-white text-center border-2 border-mainColor p-1 w-[100px] h-[35px] transition-all hover:bg-[#00937A] active:scale-95 ${isSelected ? 'bg-mainColor' : 'bg-none'}`} onClick={onClick}>
			{month}.{day} {week}
		</button>
	)
}

export default MeetingDate
