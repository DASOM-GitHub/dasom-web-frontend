import React from 'react'
import { PaginationProps } from './types'

const handlePrevPage = (
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  totalPages: number
) => {
  setCurrentPage(prev => {
    const prevPage = Math.max(prev - 1, 1)
    setPage(prevPage - 1)
    return prevPage
  })
}

const handleNextPage = (
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  totalPages: number
) => {
  setCurrentPage(prev => {
    const nextPage = Math.min(prev + 1, totalPages)
    setPage(nextPage - 1)
    return nextPage
  })
}

const AdminPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  setPage,
}) => {
  return (
    <div className='my-6 space-x-4'>
      <button
        className='px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50'
        onClick={() => handlePrevPage(setCurrentPage, setPage, totalPages)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      <span className='text-lg font-bold'>
        {currentPage} / {totalPages}
      </span>
      <button
        className='px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50'
        onClick={() => handleNextPage(setCurrentPage, setPage, totalPages)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  )
}

export default AdminPagination
