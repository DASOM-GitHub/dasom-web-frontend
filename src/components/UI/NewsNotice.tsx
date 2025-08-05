import React, { JSX } from 'react'

interface notice {
  text: string
}

const NewsNotice = ({ text }: notice): JSX.Element => {
  return (
    <div className='w-[100%] font-pretendardRegular text-[12px] mb-5'>
      <div
        className='text-white whitespace-pre-wrap'
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  )
}

export default NewsNotice
