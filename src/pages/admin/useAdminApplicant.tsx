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

// 임시 더미데이터
const mockApplicants: ApplicantListItem[] = [
  { id: 1, name: '홍길동1', studentNo: '20251203', status: 'PENDING' },
  { id: 2, name: '홍길동2', studentNo: '20259352', status: 'INTERVIEW_FAILED' },
  { id: 3, name: '홍길동3', studentNo: '20259871', status: 'PENDING' },
  { id: 4, name: '홍길동4', studentNo: '20255590', status: 'DOCUMENT_FAILED' },
  { id: 5, name: '홍길동5', studentNo: '20254850', status: 'PENDING' },
  { id: 6, name: '홍길동6', studentNo: '20257777', status: 'DOCUMENT_PASSED' },
  { id: 7, name: '홍길동7', studentNo: '20253421', status: 'INTERVIEW_PASSED' },
  { id: 8, name: '홍길동8', studentNo: '20259001', status: 'PENDING' },
  { id: 9, name: '홍길동9', studentNo: '20258345', status: 'DOCUMENT_PASSED' },
  { id: 10, name: '홍길동10', studentNo: '20259999', status: 'INTERVIEW_FAILED' },
  { id: 11, name: '홍길동11', studentNo: '20250011', status: 'PENDING' },
  { id: 12, name: '홍길동12', studentNo: '20250123', status: 'PENDING' },
  { id: 13, name: '홍길동13', studentNo: '20250321', status: 'DOCUMENT_PASSED' },
  { id: 14, name: '홍길동14', studentNo: '20250456', status: 'INTERVIEW_PASSED' },
  { id: 15, name: '홍길동15', studentNo: '20250567', status: 'DOCUMENT_FAILED' },
  { id: 16, name: '홍길동16', studentNo: '20250678', status: 'PENDING' },
  { id: 17, name: '홍길동17', studentNo: '20250789', status: 'INTERVIEW_PASSED' },
  { id: 18, name: '홍길동18', studentNo: '20250890', status: 'PENDING' },
]
const mockInterviewees: IntervieweeItem[] = [
  {
    applicantId: 1,
    applicantName: '김면접1',
    studentNo: '20251111',
    contact: '010-1111-1111',
    email: 'interviewee1@example.com',
    activityWish: '프로젝트',
    reasonForApply: '면접을 통해 저의 역량을 보여주고 싶습니다.',
    interviewDate: '2025-08-28',
    interviewTime: '10:00',
    appliedDate: '2025-08-26T10:00:00.000Z',
  },
  {
    applicantId: 2,
    applicantName: '김면접2',
    studentNo: '20252222',
    contact: '010-2222-2222',
    email: 'interviewee2@example.com',
    activityWish: '스터디',
    reasonForApply: '스터디를 통해 함께 성장하고 싶습니다.',
    interviewDate: '2025-08-28',
    interviewTime: '10:30',
    appliedDate: '2025-08-26T10:05:00.000Z',
  },
  {
    applicantId: 3,
    applicantName: '김면접3',
    studentNo: '20253333',
    contact: '010-3333-3333',
    email: 'interviewee3@example.com',
    activityWish: '프로젝트',
    reasonForApply: '새로운 사람들과 협업하며 즐겁게 활동하고 싶습니다.',
    interviewDate: '2025-08-28',
    interviewTime: '11:00',
    appliedDate: '2025-08-26T10:10:00.000Z',
  },
  {
    applicantId: 4,
    applicantName: '김면접4',
    studentNo: '20254444',
    contact: '010-4444-4444',
    email: 'interviewee4@example.com',
    activityWish: '기타',
    reasonForApply: '동아리에서 다양한 경험을 해보고 싶습니다.',
    interviewDate: '2025-08-28',
    interviewTime: '11:30',
    appliedDate: '2025-08-26T10:15:00.000Z',
  },
]
const mockDetailInfo: ApplicantDetail = {
  id: 1,
  name: '홍길동',
  studentNo: '20210000',
  status: 'PENDING',
  contact: '010-1234-5678',
  email: 'test@example.com',
  grade: '3',
  reasonForApply: '동아리 활동을 통해 새로운 경험을 쌓고 싶어서 지원합니다. 동아리 활동을 통해 새로운 경험을 쌓고 싶어서 지원합니다. 동아리 활동을 통해 새로운 경험을 쌓고 싶어서 지원합니다.',
  activityWish: '프로젝트',
  isPrivacyPolicyAgreed: true,
  createdAt: '2025-08-16T16:43:08.574Z',
  updatedAt: '2025-08-16T16:43:08.574Z',
}

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
          // const response = await listApplicants(page)
          // setApplicants(response.content)
          // setCount(response.totalElements)
          // setTotalPages(response.totalPages)
          setApplicants(mockApplicants)
          setCount(mockApplicants.length)
          setTotalPages(Math.ceil(mockApplicants.length / 20))
        } else {
          // const response = await getInterviewees()
          setInterviewees(mockInterviewees)
          setCount(mockInterviewees.length)
          setTotalPages(Math.ceil(mockInterviewees.length / 20))
        }
        setDetailInfo(mockDetailInfo)
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