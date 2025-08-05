import React, { useEffect, useState } from 'react'
import AdminPagination from '../../components/UI/AdminPagination'
import axios from 'axios'

interface Applicant {
  applicantId: number
  applicantName: string
  studentNo: string
  contact: string
  email: string
  activityWish: string
  reasonForApply: string
  interviewDate: string
  interviewTime: string
  appliedDate: string
}

interface CustomTooltipProps {
  text: string
  children: React.ReactNode
}

const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='mb-[4px] flex justify-between w-[1220px]'>
    <table className='w-[1220px] border border-gray-500 text-white'>
      {children}
    </table>
  </div>
)

const CustomTooltip: React.FC<CustomTooltipProps> = ({ text, children }) => {
  const [showFullText, setShowFullText] = useState(false)

  const handleClick = () => {
    setShowFullText(!showFullText)
  }

  return (
    <div className='relative inline-block'>
      {children}
      {/* 더보기 버튼 */}
      <button onClick={handleClick} className='ml-2 text-gray-400 text-sm'>
        {showFullText ? '닫기' : '더보기'}
      </button>
      {/* 더보기 클릭 시 표시되는 텍스트 */}
      {showFullText && (
        <div className='absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-max max-w-[400px] bg-black text-white text-[16px] rounded p-2 z-30'>
          {text}
        </div>
      )}
    </div>
  )
}

const ManInterviewee: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortBy, setSortBy] = useState<'interview' | 'applied'>('interview')

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get<Applicant[]>(
          'https://dmu-dasom-api.or.kr/api/recruit/interview/applicants'
        )
        setApplicants(response.data)
      } catch (error) {
        console.error('면접 예약자 데이터를 불러오는 중 오류 발생:', error)
      }
    }
    fetchApplicants()
  }, [])

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + '...' : text
  }

  const filteredApplicants = applicants.filter(applicant =>
    applicant.applicantName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 면접 일시 및 면접 신청 일시 sort
  const handleSort = (sortType: 'interview' | 'applied') => {
    setSortBy(sortType)
    const sortedApplicants = [...filteredApplicants].sort((a, b) => {
      let aDate, bDate

      if (sortType === 'interview') {
        aDate = new Date(`${a.interviewDate} ${a.interviewTime}`)
        bDate = new Date(`${b.interviewDate} ${b.interviewTime}`)
      } else {
        aDate = new Date(a.appliedDate)
        bDate = new Date(b.appliedDate)
      }

      if (sortOrder === 'asc') {
        return aDate.getTime() - bDate.getTime()
      } else {
        return bDate.getTime() - aDate.getTime()
      }
    })

    setApplicants(sortedApplicants)
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(20)
  const lastApplicant = currentPage * itemsPerPage
  const firstApplicant = lastApplicant - itemsPerPage
  const currentApplicants = filteredApplicants.slice(
    firstApplicant,
    lastApplicant
  )
  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage)
  const [page, setPage] = useState<number>(0)

  return (
    <div className='h-[100vh] w-[100vw] bg-mainBlack font-pretendardRegular text-white flex flex-col items-center overflow-y-auto'>
      <div className='flex justify-between w-[1220px] mt-[155px] mb-[4px]'>
        <div className='text-[20px] font-pretendardRegular'>
          면접 예약자 조회
        </div>
        <input
          type='text'
          placeholder='이름으로 검색'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='text-black px-2 py-1 border border-gray-300 rounded'
        />
      </div>
      <Table>
        <thead>
          <tr className='border border-gray-500 py-[4px] font-pretendardBold'>
            <th className='py-[4px] border border-gray-500 w-[120px]'>이름</th>
            <th className='py-[4px] border border-gray-500 w-[150px]'>학번</th>
            <th className='py-[4px] border border-gray-500 w-[150px]'>
              연락처
            </th>
            <th className='py-[4px] border border-gray-500 w-[250px]'>
              지원 동기
            </th>
            <th className='py-[4px] border border-gray-500'>활동 희망 사항</th>
            <th
              className='py-[4px] border border-gray-500 w-[150px] cursor-pointer'
              onClick={() => handleSort('interview')}
            >
              면접 일시{' '}
              {sortBy === 'interview' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className='py-[4px] border border-gray-500 w-[150px] cursor-pointer'
              onClick={() => handleSort('applied')}
            >
              면접 신청 일시{' '}
              {sortBy === 'applied' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentApplicants.map(applicant => (
            <tr key={applicant.applicantId} className='py-[4px]'>
              <td className='border border-gray-500 p-1 text-center'>
                {applicant.applicantName}
              </td>
              <td className='border border-gray-500 p-1 text-center'>
                {applicant.studentNo}
              </td>
              <td className='border border-gray-500 p-1 text-center'>
                {applicant.contact}
              </td>
              <td className='border border-gray-500 p-1'>
                <CustomTooltip text={applicant.reasonForApply}>
                  <span>{truncateText(applicant.reasonForApply, 20)}</span>
                </CustomTooltip>
              </td>
              <td className='border border-gray-500 p-1'>
                <CustomTooltip text={applicant.activityWish}>
                  <span>{truncateText(applicant.activityWish, 20)}</span>
                </CustomTooltip>
              </td>
              <td className='border border-gray-500 p-1 text-center'>
                {`${applicant.interviewDate} ${applicant.interviewTime}`}
              </td>
              <td className='border border-gray-500 p-1 text-center'>
                {new Date(applicant.appliedDate).toLocaleDateString('ko-KR')}{' '}
                {new Date(applicant.appliedDate).toLocaleTimeString('en-GB', {
                  hour12: false,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        setPage={setPage}
      />
    </div>
  )
}

export default ManInterviewee
