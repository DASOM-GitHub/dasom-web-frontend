import React, { JSX } from 'react'

interface notice {
	text: string
	date: Date
}

const NewsNotice = ({ text, date }: notice): JSX.Element => {
	return (
		<div className='w-[90%] mb-5'>
			<div className='text-white font-pretendardRegular whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: text }} />
			<p className='text-subGrey2 font-pretendardRegular mt-5'>작성일 : {date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
		</div>
	)
}

export default NewsNotice
