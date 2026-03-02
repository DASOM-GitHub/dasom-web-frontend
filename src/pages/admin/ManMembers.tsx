import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 더미 데이터 인터페이스
interface MemberItem {
  id: number
  name: string
  studentNo: string
  role: string
  joinedDate: string
}

const ManMembers: React.FC = () => {
  const navigate = useNavigate()

  // 추후 API 연동 시 사용할 상태 (현재는 더미)
  const [members] = useState<MemberItem[]>([
    { id: 1, name: '홍길동', studentNo: '20230001', role: 'ADMIN', joinedDate: '2023-08-01' },
    { id: 2, name: '김철수', studentNo: '20230002', role: 'MEMBER', joinedDate: '2023-08-05' },
    { id: 3, name: '이영희', studentNo: '20230003', role: 'MEMBER', joinedDate: '2023-08-10' },
  ])

  return (
    <div className='h-[100vh] w-[100vw] bg-mainBlack text-white font-pretendardRegular overflow-y-auto'>
      <div className='flex flex-col items-center pt-[100px] pb-[50px]'>
        
        {/* 헤더 섹션 */}
        <div className='w-[800px] flex justify-between items-end mb-8'>
          <div>
            <h1 className='text-3xl font-pretendardBold text-mainColor'>회원 관리</h1>
            <p className='text-[14px] text-gray-400 mt-2'>전체 회원 목록을 조회하고 관리합니다.</p>
          </div>
          <div 
            className='cursor-pointer text-[14px] bg-subGrey3 px-4 py-2 rounded-[6px] hover:bg-gray-700'
            onClick={() => navigate('/admin')}
          >
            뒤로가기
          </div>
        </div>

        {/* 회원 목록 테이블 */}
        <div className='w-[800px] bg-subGrey3 rounded-[8px] overflow-hidden'>
          <table className='w-full text-center border-collapse'>
            <thead>
              <tr className='bg-[#278573] text-white font-pretendardSemiBold h-[50px]'>
                <th className='w-16'>ID</th>
                <th className='w-32'>이름</th>
                <th className='w-40'>학번</th>
                <th className='w-32'>권한</th>
                <th>가입일</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr 
                  key={member.id} 
                  className='border-b border-gray-700 h-[50px] hover:bg-gray-800 transition-colors'
                >
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.studentNo}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-[4px] text-[12px] ${member.role === 'ADMIN' ? 'bg-mainColor' : 'bg-gray-600'}`}>
                      {member.role}
                    </span>
                  </td>
                  <td>{member.joinedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {members.length === 0 && (
            <div className='py-20 text-center text-gray-500'>
              등록된 회원이 없습니다.
            </div>
          )}
        </div>

        {/* 하단 안내 버튼 (AdminMain 디자인 스타일) */}
        <div className='mt-10'>
          <div
            className='cursor-pointer w-[420px] border border-mainColor text-mainColor text-center py-[9px] rounded-[6px] hover:bg-mainColor hover:text-white transition-all'
            onClick={() => alert('신규 회원 등록 기능은 준비 중입니다.')}
          >
            + 신규 회원 등록
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ManMembers