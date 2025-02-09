interface props {
	month: string
	day: string
	week: string
	/** 날짜 선택 핸들러 */
	onClick?: () => void
	/** 선택 여부 */
	isSelected?: boolean
}

/** 면접 날짜 선택 버튼 컴포넌트 */
const MeetingDate = ({ month, day, week, onClick, isSelected }: props): JSX.Element => {
	return (
		<button className={`font-pretendardBold text-white text-center border-2 border-mainColor p-1 w-[100px] h-[35px] ${isSelected ? 'bg-mainColor' : 'bg-none'}`} onClick={onClick}>
			{month}.{day} {week}
		</button>
	)
}

export default MeetingDate
