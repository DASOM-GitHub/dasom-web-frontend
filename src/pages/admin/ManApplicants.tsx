import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import AdminPagination from '../../components/UI/AdminPagination'
import MailButtons from '../../components/UI/MailButtons'
import AdminApplicantButton from '../../components/UI/AdminApplicantButton'
import {
  listApplicants,
  getApplicantDetail,
  updateApplicantStatus,
  getInterviewees,
} from './adminService'
import { ApplicantListItem, ApplicantDetail, IntervieweeItem } from './admin'

dayjs.extend(utc)

const ManApplicants: React.FC = () => {
  const [applicants, setApplicants] = useState<ApplicantListItem[]>([]) // 전체 조회 시 지원자 정보
  const [interviewees, setInterviewees] = useState<IntervieweeItem[]>([])
  const [count, setCount] = useState<number>(0) // 지원자 수
  const [detailInfo, setDetailInfo] = useState<ApplicantDetail | null>(null) // 특정 지원자 상세정보
  const [selectedId, setSelectedId] = useState<number | null>(null) // 상태 변경 시 선택된 지원자id
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)// 면접자 정렬
  const navigate = useNavigate()

  const accessToken = localStorage.getItem('accessToken')

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

  //임시 더미데이터
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
    updatedAt: '2025-08-16T16:43:08.574Z'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) {
          alert('로그인이 필요합니다.')
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
          alert('조회된 데이터가 없습니다.')
        } else {
          alert('데이터 불러오기에 실패하였습니다.')
        }
      }
    }

    fetchData()
  }, [viewMode, page, accessToken])

  // 상세정보 조회
  // const getDetail = async (id: number) => {
  //   if (selectedId === id) {
  //     setSelectedId(null)
  //     setDetailInfo(null)
  //     return
  //   }

  //   try {
  //     const detail = await getApplicantDetail(id)
  //     setDetailInfo(detail)
  //     setSelectedId(id)
  //   } catch (err: any) {
  //     console.error('지원자 상세 조회 실패:', err)
  //     const errorCode = err.response?.data?.code
  //     if (errorCode === 'C012') {
  //       alert('해당 지원자의 상세 정보가 없습니다.')
  //     } else {
  //       alert('상세 정보를 불러오는 데 실패하였습니다.')
  //     }
  //   }
  // }

  // 면접자 정렬
  const sortedInterviewees = [...interviewees].sort((a, b) => {
    const dateA = dayjs(`${a.interviewDate}T${a.interviewTime}`)
    const dateB = dayjs(`${b.interviewDate}T${b.interviewTime}`)

    if (sortOrder === 'asc') {
      return dateA.diff(dateB)
    }
    if (sortOrder === 'desc') {
      return dateB.diff(dateA)
    }
    return 0 // 정렬하지 않음
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

  // 지원자 상태 변경
  const handleStatusChange = (id: number, newStatus: string) => {
    const statusValue = reverseStatusMap[newStatus] || 'PENDING'

    setApplicants(prev =>
      prev.map(applicant =>
        applicant.id === id ? { ...applicant, status: statusValue } : applicant
      )
    )
    setOpenDropdownId(null) // 드롭다운 닫기

    updateApplicantStatus(id, statusValue)
      .then(() => {
        //console.log('상태 변경 성공:', newStatus)
        toast.success('상태 변경이 완료되었습니다!')
      })
      .catch(err => console.error('상태 변경 실패:', err))
  }

  // 상태값 별 색상 맵
  const statusColorMap: Record<string, string> = {
    PENDING: 'bg-mainBlack', // 지원 완료
    DOCUMENT_PASSED: 'bg-[#355187] ', // 서류 합격
    DOCUMENT_FAILED: 'bg-[#873535]', // 서류 불합격
    INTERVIEW_PASSED: 'bg-[#0E2246]', // 면접 합격
    INTERVIEW_FAILED: 'bg-[#4D1A1A]', // 면접 불합격
  }

  // 지원자 리스트 항목 컴퍼넌트
  const ApplicantInfo = ({ applicant }: { applicant: any }) => {
    return (
      <tr 
      className='text-center cursor-pointer hover:bg-subGrey3 border-b-white border-b-[1px] h-[50px]'
      //onClick={() => getDetail(applicant.id)} 더미데이터 지우고 활성화
      >
        <td className='py-[4px]'>{applicant.id}</td>
        <td className='py-[4px]'>{applicant.name}</td>
        <td className='py-[4px]'>
          {applicant.studentNo}
        </td>
        <td className='py-[4px] relative'>
          <div
            className={`w-[110px] m-auto p-[4px] rounded-full cursor-pointer text-white ${statusColorMap[applicant.status]}`}
            onClick={(e) => {
              e.stopPropagation()
              setOpenDropdownId(
                openDropdownId === applicant.id ? null : applicant.id
              )
            }}
          >
            {statusMap[applicant.status]}
          </div>
          {/* 드롭다운 */}
          {openDropdownId === applicant.id && (
            <div className='absolute top-[40px] left-1/2 transform -translate-x-1/2 w-[110px] bg-gray-700 rounded-[6px] z-10 text-white'>
              {statusOptions.map(option => (
                <div
                  key={option}
                  className='px-4 py-2 hover:bg-gray-800 cursor-pointer'
                  onClick={() => handleStatusChange(applicant.id, option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </td>
      </tr>
    )
  }

  //면접자 리스트 항목 컴포넌트
  const IntervieweeInfo = ({ interviewee }: { interviewee: IntervieweeItem }) => {
    return (
      <tr
        className='text-center cursor-pointer hover:bg-subGrey3 border-b-white border-b-[1px] h-[50px]'
        //onClick={() => getDetail(interviewee.applicantId)}
      >
        <td className='py-[4px]'>{interviewee.applicantId}</td>
        <td className='py-[4px]'>{interviewee.applicantName}</td>
        <td className='py-[4px]'>{interviewee.studentNo}</td>
        <td className='py-[4px]'>
          {dayjs(`${interviewee.interviewDate}T${interviewee.interviewTime}`).format('MM/DD HH:mm')}
        </td>
        <td className='py-[4px]'>
          {dayjs.utc(interviewee.appliedDate).format('MM/DD HH:mm')}
        </td>
      </tr>
    )
  }

  // 지원자 상세 정보 컴포넌트
  const ApplicantDetailInfo = ({ applicant }: { applicant: any }) => {
    return (
      <div className='flex flex-col space-y-8 m-8'>
        <div className='flex space-x-6 items-end'>
          <div className='font-pretendardBold text-3xl'>{applicant?.name}</div>
          <div>{applicant?.grade}학년</div>
        </div>
        <div>
          <div className='font-pretendardBold text-2xl'>CONTACT</div>
          <div className='border-b-white border-b-2 my-1'></div>
          <div className='flex'>
            <div className='w-20'>전화번호</div>
            <div>{applicant?.contact}</div>
          </div>
          <div className='flex'>
            <div className='w-20'>이메일</div>
            <div>{applicant?.email}</div>
          </div>
        </div>
        <div>
          <div className='font-pretendardBold text-2xl'>지원 동기</div>
          <div className='border-b-white border-b-2 my-1'></div>
          <div>{applicant?.reasonForApply}</div>
        </div>
        <div>
          <div className='font-pretendardBold text-2xl'>희망 활동</div>
          <div className='border-b-white border-b-2 my-1'></div>
          <div>{applicant?.activityWish}</div>
        </div>
        <div className='space-y-1'>
          <div className='flex'>
            <div className='w-28'>개인정보 동의</div>
            <div>{applicant?.isPrivacyPolicyAgreed ? 'O' : 'X'}</div>
          </div>
          <div className='flex'>
            <div className='w-28'>지원 일시</div>
            <div>{dayjs.utc(applicant?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
          <div className='flex'>
            <div className='w-28'>최종수정 일시</div>
            <div>{dayjs.utc(applicant?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-black font-pretendardRegular text-white flex flex-col overflow-y-auto'>
      <ToastContainer />
      <div className="flex flex-col items-center min-w-[1220px]">
      <div className='mb-[4px] mt-[155px] w-[1220px]'>
        <div className='flex space-x-4 mb-8'>
          <AdminApplicantButton
            label='지원자 조회'
            active={viewMode === 'applicants'}
            onClick={() => setViewMode('applicants')}
          />
          <AdminApplicantButton
            label='면접자 조회'
            active={viewMode === 'interviewees'}
            onClick={() => setViewMode('interviewees')}
          />
        </div>
        <div>
          <span className='font-pretendardBold text-mainColor'>{count}</span>
          {viewMode === 'applicants' ? '명의 지원자' : '명의 면접자'}가 있습니다.
        </div>
      </div>

      <div className='flex w-[1220px] justify-between'>
        <div className='w-[700px]'>
          {/* 지원자/면접자 목록 테이블 */}
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-subGrey3 font-pretendardBold text-center'>
                {viewMode === 'applicants' ? (
                  <>
                    <th className='py-1.5 w-20'>ID</th>
                    <th className='w-56'>이름</th>
                    <th className='w-48'>학번</th>
                    <th>상태</th>
                  </>
                ) : (
                  <>
                    <th className='py-1.5 w-20'>ID</th>
                    <th className='w-36'>이름</th>
                    <th className='w-40'>학번</th>
                    <th onClick={handleSort} className='w-30 cursor-pointer'>
                      면접 일시
                      {sortOrder === 'asc' && ' ▲'}
                      {sortOrder === 'desc' && ' ▼'}
                    </th>
                    <th>면접 신청 일시</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {viewMode === 'applicants'
                ? applicants.map((applicant) => (
                    <ApplicantInfo key={applicant.id} applicant={applicant} />
                  ))
                : sortedInterviewees.map((interviewee) => (
                    <IntervieweeInfo
                      key={interviewee.applicantId}
                      interviewee={interviewee}
                    />
                  ))
              }
            </tbody>
          </table>
          <div className='w-[700px]'>
            <MailButtons />
          </div>
        </div>
        <div className='h-fit w-[500px] bg-subGrey3'>
          <ApplicantDetailInfo applicant={detailInfo} />
        </div>
      </div>
      {/* 페이지네이션 */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        setPage={setPage}
      />
      </div>
    </div>
  )
}

export default ManApplicants
