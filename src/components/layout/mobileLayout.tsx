import React from 'react'

interface Props {
  children: React.ReactNode
}

const mobileLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-[375px] mx-auto bg-mainBlack min-h-screen">
      {children}
    </div>
  )
}

export default mobileLayout