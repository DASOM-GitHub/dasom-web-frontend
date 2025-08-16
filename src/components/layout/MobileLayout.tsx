import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'

interface Props {
  children: React.ReactNode
}

const MobileLayout: React.FC<Props> = ({ children }) => {
  const { width, height } = useWindowSize()

  return (
    <div
      className='mx-auto bg-mainBlack overflow-auto no-scrollbar min-w-[395px]'
      style={{
        width: width > 480 ? '40%' : '100%', // PC에서는 고정, 모바일에서는 꽉 차게
        minHeight: 'calc(100vh - 56px)', // viewport 높이 - header 높이(56px)만 제외 (footer는 recruit 페이지에서 없음)
      }}
    >
      {children}
    </div>
  )
}

export default MobileLayout
