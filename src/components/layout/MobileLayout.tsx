import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'

interface Props {
  children: React.ReactNode;
}

const MobileLayout: React.FC<Props> = ({ children }) => {
  const { width, height } = useWindowSize()

  return (
    <div
      className="mx-auto bg-mainBlack"
      style={{
        width: width > 480 ? '395px' : '100%', // PC에서는 고정, 모바일에서는 꽉 차게
        height: height,
      }}
    >
      {children}
    </div>
  )
}

export default MobileLayout