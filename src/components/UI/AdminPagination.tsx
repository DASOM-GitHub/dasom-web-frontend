import React from 'react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const AdminPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div className='my-6 space-x-4'>
            <button 
                className='px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50' 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1}
            >
                이전
            </button>
            <span className='text-lg font-bold'>{currentPage} / {totalPages}</span>
            <button 
                className='px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50' 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages}
            >
                다음
            </button>
        </div>
    )
}

export default AdminPagination
