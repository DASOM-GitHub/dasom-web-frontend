import React, { JSX } from 'react'

interface props {
	time: string
	/** 시간 선택 핸들러 */
	onClick?: () => void
	/** 선택 여부 */
	isSelected?: boolean
}

/** 면접 시간 선택 버튼 컴포넌트 */
const MeetingTime = ({ time, onClick, isSelected }: props): JSX.Element => {
	return (
		<button
			className={`font-pretendardBold text-white rounded-3xl text-center border-2 border-mainColor w-[80px] h-[40px] ${isSelected ? 'bg-mainColor' : 'bg-none'}`}
			onClick={onClick}>
			{time}
		</button>
	)
}

export default MeetingTime
