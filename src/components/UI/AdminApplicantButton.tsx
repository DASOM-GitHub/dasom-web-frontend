import React from 'react'
import { AdminApplicantButtonProps } from './types'

const AdminApplicantButton: React.FC<AdminApplicantButtonProps> = ({ label, active, onClick }) => {
  return (
    <div
      className={`cursor-pointer w-28 py-2 rounded-full text-center text-white ${
        active ? 'font-pretendardBold bg-mainColor' : 'bg-subGrey3'
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

export default AdminApplicantButton
