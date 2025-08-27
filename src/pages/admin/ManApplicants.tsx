import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import AdminPagination from '../../components/UI/AdminPagination'
import MailButtons from '../../components/UI/MailButtons'
import AdminApplicantButton from '../../components/UI/AdminApplicantButton'
import { useAdminApplicant } from './useAdminApplicant'
import { ApplicantListItem, IntervieweeItem } from './admin'

dayjs.extend(utc)

const ManApplicants: React.FC = () => {
  const {
    applicants,
    count,
    detailInfo,
    sortOrder,
    viewMode,
    openDropdownId,
    currentPage,
    totalPages,
    statusMap,
    statusOptions,
    sortedInterviewees,
    setViewMode,
    setOpenDropdownId,
    setCurrentPage,
    setPage,
    getDetail,
    handleSort,
    handleStatusChange,
  } = useAdminApplicant()

  // 상태값 별 색상 맵
  const statusColorMap: Record<string, string> = {
    PENDING: 'bg-mainBlack', // 지원 완료
    DOCUMENT_PASSED: 'bg-[#355187] ', // 서류 합격
    DOCUMENT_FAILED: 'bg-[#873535]', // 서류 불합격
    INTERVIEW_PASSED: 'bg-[#0E2246]', // 면접 합격
    INTERVIEW_FAILED: 'bg-[#4D1A1A]', // 면접 불합격
  }

  // 지원자 리스트 항목 컴퍼넌트
  const ApplicantInfo = ({ applicant }: { applicant: ApplicantListItem }) => {
    return (
      <tr 
      className='text-center cursor-pointer hover:bg-subGrey3 border-b-white border-b-[1px] h-[50px]'
      onClick={() => getDetail(applicant.id)}
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
        onClick={() => getDetail(interviewee.applicantId)}
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
    <div className='bg-black font-pretendardRegular text-white flex flex-col overflow-y-auto min-h-[1200px]'>
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
