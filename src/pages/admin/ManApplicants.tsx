import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import AdminPagination from '../../components/UI/AdminPagination'

const ManApplicants: React.FC = () => {
    const [applicants, setApplicants] = useState<any[]>([])             // 전체 조회 시 지원자 정보
    const [count, setCount] = useState<number>(0)                       // 지원자 수
    const [detailInfo, setDetailInfo] = useState<any>(null)             // 특정 지원자 상세정보
    const [selectedId, setSelectedId] = useState<number | null>(null)   // 상태 변경 시 선택된 지원자id
    const navigate = useNavigate()

    const accessToken = localStorage.getItem('accessToken')
    
    // 합격 불합격 상태
    const statusMap: Record<string, string> = {
        PENDING: '지원 완료',
        DOCUMENT_PASSED: '서류 합격',
        DOCUMENT_FAILED: '서류 불합격',
        INTERVIEW_PASSED: '면접 합격',
        INTERVIEW_FAILED: '면접 불합격'
    }
    const reverseStatusMap = Object.fromEntries(
        Object.entries(statusMap).map(([key, value]) => [value, key])
    )
    const statusOptions = Object.values(statusMap)
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState<number>(1)              // 현재 페이지
    const applicantsPerPage = 20                                           // 페이지 당 지원자 수
    const LastApplicant = currentPage * applicantsPerPage                  // 페이지에서 마지막 지원자
    const FirstApplicant = LastApplicant - applicantsPerPage               // 페이지에서 첫번째 지원자
    const currentApplicants = applicants.slice(FirstApplicant, LastApplicant) // 현재 페이지에서 지원자
    const totalPages = Math.ceil(applicants.length / applicantsPerPage)       // 총 페이지 수수



    // 지원자 전체 조회
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!accessToken) {
                    alert('로그인이 필요합니다.')
                    return
                }
        
                const response = await axios.get('https://dmu-dasom-api.or.kr/api/admin/applicants', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                console.log(response.data)
                setApplicants(response.data.content)
                setCount(response.data.totalElements)
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
    }, [])

    // 상세정보 조회 및 토글
    const toggleDetail = async (id: number) => {
        if (selectedId === id) {
            setSelectedId(null)
            setDetailInfo(null)
            return
        }
    
        try {
            const response = await axios.get(`https://dmu-dasom-api.or.kr/api/admin/applicants/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setDetailInfo(response.data)
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

    // 지원자 상태 변경
    const handleStatusChange = (id: number, newStatus: string) => {
        const statusValue = reverseStatusMap[newStatus] || 'PENDING'
        
        setApplicants((prev) =>
            prev.map((applicant) =>
                applicant.id === id ? { ...applicant, status: statusValue } : applicant
            )
        )
        setOpenDropdownId(null) // 드롭다운 닫기

        axios.patch(`https://dmu-dasom-api.or.kr/api/admin/applicants/${id}/status`, { status: statusValue }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(() => {
            console.log('상태 변경 성공:', newStatus)
            toast.success('상태 변경이 완료되었습니다!')
        })
        .catch((err) => console.error('상태 변경 실패:', err))
    }


    // 지원자 리스트 항목 컴퍼넌트
    const ApplicantInfo = ({applicant}:{applicant:any}) => {
        return (
            <tr className='text-center'>
                <td className='border border-gray-500 py-[4px]'>{applicant.id}</td>
                <td className='border border-gray-500 py-[4px]'>{applicant.name}</td>
                <td className='border border-gray-500 py-[4px]'>{applicant.studentNo}</td>
                <td className="border border-gray-500 py-[4px] relative">
                    <div 
                        className="w-[120px] m-auto p-[4px] rounded-[6px] cursor-pointer bg-gray-700 text-white"
                        onClick={() => setOpenDropdownId(openDropdownId === applicant.id ? null : applicant.id)}
                    >
                        {statusMap[applicant.status]}
                    </div>
                    {/* 드롭다운 */}
                    {openDropdownId === applicant.id && (
                        <div className="absolute top-[40px] left-1/2 transform -translate-x-1/2 w-[130px] bg-gray-700 rounded-[6px] z-10 text-white">
                            {statusOptions.map((option) => (
                                <div 
                                    key={option} 
                                    className="px-4 py-2 hover:bg-gray-800 rounded-[6px] cursor-pointer"
                                    onClick={() => handleStatusChange(applicant.id, option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </td>
                <td className='border border-gray-500 py-[4px] text-left'>
                <div className='ml-[4px]'>
                    <button 
                        className='bg-gray-700 text-white px-2 py-1 rounded'
                        onClick={() => toggleDetail(applicant.id)}
                    >
                        {selectedId === applicant.id ? '닫기' : '보기'}
                    </button>
                    {selectedId === applicant.id && (
                        <div className='mt-1 p-2'>
                            <ApplicantDetailInfo applicant={detailInfo} />
                        </div>
                    )}
                </div>
                </td>
            </tr>
        )
    }

    // 상세 정보 아이템 컴포넌트
    const DetailItem = ({ label, value }: { label: string, value: string }) => {
        return (
            <div className='flex'>
                <div className='w-[110px]'>{label}</div>
                <div className='w-[576px]'>{value}</div>
            </div>
        )
    }
    // 지원자 상세 정보 컴포넌트
    const ApplicantDetailInfo = ({ applicant }: { applicant: any }) => {
        return (
            <div className='flex flex-col space-y-[4px]'>
                <DetailItem label="연락처" value={applicant.contact} />
                <DetailItem label="이메일" value={applicant.email} />
                <DetailItem label="지원 동기" value={applicant.reasonForApply} />
                <DetailItem label="희망 활동" value={applicant.activityWish} />
                <DetailItem label="개인정보 동의" value={applicant.isPrivacyPolicyAgreed ? 'O' : 'X'} />
                <DetailItem label="지원 일시" value={applicant.createdAt} />
                <DetailItem label="최종수정 일시" value={applicant.updatedAt} />
            </div>
        )
    }
    

    return (
        <div className='h-[100vh] w-[100vw] bg-mainBlack font-pretendardRegular text-white flex flex-col items-center overflow-y-auto'>
            <ToastContainer />
            <div className='mb-[4px] mt-[155px] flex justify-between w-[1220px]'>
                <div><span className='font-pretendardBold text-mainColor'>{count}</span>명의 지원자가 있습니다.</div>
                <div 
                    className='cursor-pointer px-2 py-1 bg-gray-700 text-white rounded-lg'
                    onClick={() => {navigate('/admin/applicants/interviewee')}}
                >
                    면접자 조회
                </div>
            </div>

            {/* 지원자 목록 테이블 */}
            <table className='w-[1220px]'>
                <thead>
                    <tr className='border border-gray-500 py-[4px] font-pretendardBold'>
                        <th className='w-[60px]'>ID</th>
                        <th className='border border-gray-500 py-[4px] w-[150px]'>이름</th>
                        <th className='border border-gray-500 py-[4px] w-[150px]'>학번</th>
                        <th className='border border-gray-500 py-[4px] w-[150px]'>상태</th>
                        <th className='border border-gray-500 py-[4px]'>상세정보</th>
                    </tr>
                </thead>
                <tbody>
                    {currentApplicants.map((applicant) => (
                        <ApplicantInfo key={applicant.id} applicant={applicant} />
                    ))}
                </tbody>
            </table>
            {/* 페이지네이션 */}
            <AdminPagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                setCurrentPage={setCurrentPage} 
            />
        </div>
    )
}

export default ManApplicants