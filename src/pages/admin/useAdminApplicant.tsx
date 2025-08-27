import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import {
  listApplicants,
  getApplicantDetail,
  updateApplicantStatus,
  getInterviewees,
} from './adminService'
import { ApplicantListItem, ApplicantDetail, IntervieweeItem } from './admin'

dayjs.extend(utc)

// 합격 불합격 상태
const statusMap: Record<string, string> = {
  PENDING: '지원 완료',
  DOCUMENT_PASSED: '서류 합격',
  DOCUMENT_FAILED: '서류 불합격',
  INTERVIEW_PASSED: '면접 합격',
  INTERVIEW_FAILED: '면접 불합격',
}
const reverseStatusMap = Object.fromEntries(
  Object.entries(statusMap).map(([key, value]) => [value, key])
)

export const useAdminApplicant = () => {
  const [applicants, setApplicants] = useState<ApplicantListItem[]>([]) // 전체 조회 시 지원자 정보
  const [interviewees, setInterviewees] = useState<IntervieweeItem[]>([])
  const [count, setCount] = useState<number>(0) // 지원자 수
  const [detailInfo, setDetailInfo] = useState<ApplicantDetail | null>(null) // 특정 지원자 상세정보
  const [selectedId, setSelectedId] = useState<number | null>(null) // 상태 변경 시 선택된 지원자id
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)// 면접자 정렬

  // 합격 불합격 상태
  const statusMap: Record<string, string> = {
    PENDING: '지원 완료',
    DOCUMENT_PASSED: '서류 합격',
    DOCUMENT_FAILED: '서류 불합격',
    INTERVIEW_PASSED: '면접 합격',
    INTERVIEW_FAILED: '면접 불합격',
  }
  const reverseStatusMap = Object.fromEntries(
    Object.entries(statusMap).map(([key, value]) => [value, key])
  )
  const statusOptions = Object.values(statusMap)
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'applicants' | 'interviewees'>(
    'applicants',
  )

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [page, setPage] = useState<number>(0)

  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) {
          toast.error('로그인이 필요합니다.')
          return
        }

        if (viewMode === 'applicants') {
          const response = await listApplicants(page)
          setApplicants(response.content)
          setCount(response.totalElements)
          setTotalPages(response.totalPages)
        } else {
          const response = await getInterviewees()
          setInterviewees(response)
          setCount(response.length)
          setTotalPages(1)
        }
      } catch (err: any) {
        console.error(err)
        const errorCode = err.response?.data?.code
        if (errorCode === 'C012') {
          toast.info('조회된 데이터가 없습니다.')
        } else {
          toast.error('데이터 불러오기에 실패하였습니다.')
        }
      }
    }

    fetchData()
  }, [viewMode, page, accessToken])

  // 상세정보 조회
  const getDetail = async (id: number) => {
    if (selectedId === id) {
      setSelectedId(null)
      setDetailInfo(null)
      return
    }

    try {
      const detail = await getApplicantDetail(id)
      setDetailInfo(detail)
      setSelectedId(id)
    } catch (err: any) {
      console.error('지원자 상세 조회 실패:', err)
      const errorCode = err.response?.data?.code
      if (errorCode === 'C012') {
        alert('해당 지원자의 상세 정보가 없습니다.')
      } else {
        alert('상세 정보를 불러오는 데 실패하였습니다.')
      }
    }
  }

  //면접자 시간 순 정렬
  const sortedInterviewees = [...interviewees].sort((a, b) => {
    const dateA = dayjs(`${a.interviewDate}T${a.interviewTime}`)
    const dateB = dayjs(`${b.interviewDate}T${b.interviewTime}`)

    if (sortOrder === 'asc') {
      return dateA.diff(dateB)
    }
    if (sortOrder === 'desc') {
      return dateB.diff(dateA)
    }
    return 0
  })

  const handleSort = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc')
    } else if (sortOrder === 'desc') {
      setSortOrder(null)
    } else {
      setSortOrder('asc')
    }
  }

  //지원자 상태 변경
  const handleStatusChange = (id: number, newStatus: string) => {
    const statusValue = reverseStatusMap[newStatus] || 'PENDING'

    setApplicants(prev =>
      prev.map(applicant =>
        applicant.id === id ? { ...applicant, status: statusValue } : applicant
      )
    )
    setOpenDropdownId(null)

    updateApplicantStatus(id, statusValue)
      .then(() => {
        toast.success('상태 변경이 완료되었습니다!')
      })
      .catch(err => {
        console.error('상태 변경 실패:', err)
        toast.error('상태 변경에 실패했습니다.')
      })
  }

  return {
    applicants,
    interviewees,
    count,
    detailInfo,
    selectedId,
    sortOrder,
    viewMode,
    openDropdownId,
    currentPage,
    totalPages,
    page,
    statusMap,
    statusOptions,
    sortedInterviewees,
    setDetailInfo,
    setSelectedId,
    setSortOrder,
    setViewMode,
    setOpenDropdownId,
    setCurrentPage,
    setPage,
    getDetail,
    handleSort,
    handleStatusChange,
  }
}