import apiClient from '../../utils/apiClient'
import React, { useEffect, useState } from 'react'

const SomkatonApplicants: React.FC = () => {
  const [applicants, setApplicants] = useState<any[]>([])
  const [detailInfo, setDetailInfo] = useState<any>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [count, setCount] = useState<number>(0)
  const accessToken = localStorage.getItem('accessToken')

  // 지원자 전체 조회
  const getData = async () => {
    try {
      if (!accessToken) {
        alert('로그인이 필요합니다.')
        return
      }
      const response = await apiClient.get('/somkathon/participants')
      console.log(response.data)
      setApplicants(response.data)
      setCount(response.data.length)
    } catch (e: any) {
      alert('지원자 목록 불러오기 실패')
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  // 지원자 상세 조회
  const toggleDetail = async (id: number) => {
    if (selectedId === id) {
      setSelectedId(null)
      setDetailInfo(null)
      return
    }

    try {
      const response = await apiClient.get(
        `/somkathon/participants/${id}`
      )
      setDetailInfo(response.data)
      setSelectedId(id)
    } catch (e: any) {
      console.log(e)
      alert('지원자 상세정보 불러오기 실패')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/somkathon/participants/${id}`)
      setDetailInfo(null)
      getData()
    } catch (e: any) {
      console.log(e)
      alert('지원자 삭제 실패')
    }
  }

  const ApplicantInfo = ({ applicant }: { applicant: any }) => {
    return (
      <tr className='text-center'>
        <td className='border border-gray-500 py=[4px]'>{applicant.id}</td>
        <td className='border border-gray-500 py=[4px]'>
          {applicant.participantName}
        </td>
        <td className='border border-gray-500 py=[4px]'>
          {applicant.studentId}
        </td>
        <td className='border border-gray-500 py=[4px] text-left'>
          <div className='ml-[4px] p-2'>
            <button
              className='bg-gray-700 text-white px-2 py-1 rounded'
              onClick={() => toggleDetail(applicant.id)}
            >
              {' '}
              {selectedId === applicant.id ? '닫기' : '보기'}
            </button>
            {selectedId === applicant.id && (
              <div>
                {detailInfo && <ApplicantDetailInfo applicant={detailInfo} />}
              </div>
            )}
          </div>
        </td>
      </tr>
    )
  }

  const DetailItem = ({ label, value }: { label: string; value: string }) => {
    return (
      <div className='flex'>
        <div className='w-[110px]'>{label}</div>
        <div className='w-[576px]'>{value}</div>
      </div>
    )
  }

  const ApplicantDetailInfo = ({ applicant }: { applicant: any }) => {
    if (!applicant) return null
    return (
      <div className='flex flex-col space-y-[4px] p-4'>
        <DetailItem label='연락처' value={applicant.contact} />
        <DetailItem label='이메일' value={applicant.email} />
        <DetailItem label='학년' value={applicant.grade} />
        <DetailItem label='학과' value={applicant.department} />
        <div className='flex gap-[10px]'>
          <button className='bg-gray-700 text-white px-2 py-1 rounded w-20'>
            수정
          </button>
          <button
            className='bg-gray-700 text-white px-2 py-1 rounded w-20'
            onClick={() => handleDelete(applicant.id)}
          >
            삭제
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='h-[100vh] w-[100vw] bg-mainBlack font-pretendardRegular text-white flex flex-col items-center overflow-y-auto'>
      <div className='mb-[4px] mt-[155px] flex justify-between w-[1220px]'>
        <div>
          <span className='font-pretendardBold text-mainColor'>{count}</span>
          명의 지원자가 있습니다.
        </div>
      </div>
      <table className='w-[1220px]'>
        <thead>
          <tr className='border border-gray-500 py-[4px] font-pretendardBold'>
            <th className='w-[60px]'>ID</th>
            <th className='border border-gray-500 py-[4px] w-[150px]'>이름</th>
            <th className='border border-gray-500 py-[4px] w-[150px]'>학번</th>
            <th className='border border-gray-500 py-[4px]'>상세정보</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(applicant => (
            <ApplicantInfo key={applicant.id} applicant={applicant} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SomkatonApplicants
