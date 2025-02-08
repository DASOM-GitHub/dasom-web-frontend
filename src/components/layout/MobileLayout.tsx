import React from 'react'

interface Props {
  children: React.ReactNode
}

const MobileLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-[395px] mx-auto bg-mainBlack min-h-screen">
      {children}
    </div>
  )
}

export default MobileLayout
