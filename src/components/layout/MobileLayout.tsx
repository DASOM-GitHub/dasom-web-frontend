import React from 'react'

interface Props {
  children: React.ReactNode
}

const MobileLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-[375px] mx-auto bg-mainBlack  h-[100px]">
      {children}
    </div>
  )
}

export default MobileLayout
