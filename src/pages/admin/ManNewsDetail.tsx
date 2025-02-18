import React from 'react'
import MobileLayout from '../../components/layout/MobileLayout'
import NewsContent from '../../components/UI/NewsContent'
import NewsNotice from '../../components/UI/NewsNotice'

interface notice {
	id: number
	text: string
	date: Date
}

const ManNewsDetail: React.FC = () => {
    return (
        <div className='h-[100vh] w-[100vw] bg-mainBlack font-pretendardRegular text-white flex flex-col items-center'>
            <MobileLayout>
                <div className='mt-[80px] mb-[20px] mr-[20px] flex justify-end'>
                    <div className='cursor-pointer border border-gray-600 px-2 py-1 rounded-[6px] bg-gray-800 hover:bg-gray-900 mr-[8px]'>수정</div>
                    <div className='cursor-pointer border border-gray-600 px-2 py-1 rounded-[6px] bg-gray-800 hover:bg-gray-900'>삭제</div>
                </div>
            
                <div className='flex flex-col items-center w-full mb-40'>
                    <NewsContent title='다솜 34기 신규 부원 모집!' banner={null} date='2월 25일(화) ~ 3월 14일(금)' onClick={() => {}} id={1} />
                    <NewsNotice text={examText} date={examDate} />
                </div>
            </MobileLayout>
        </div>
    )
}

/** DB에서 받아올 예시 데이터 */
const examText: string =
	'<p>컴퓨터공학부 전공 동아리 <span style="color:#00B493 ">다솜</span>은 1992년에 설립된, <strong>웹/앱 서비스 개발</strong>을 통해 개인의 개발 실력 향상을 도모하는 동아리입니다.</p>\n' +
	'<p>다솜에서는 활발한 커뮤니티 형성을 목적으로 하며, 현직자 강의, 세미나와 스터디 및 팀 프로젝트 활동 등으로 비단 개인만이 아닌 <strong>팀과의 협업을 경험</strong>하고, <strong>실력과 인사이트 모두 한 단계 더 성장</strong>할 수 있게끔 지원해드리고 있습니다. ☺️</p>\n' +
	'<p>또한, 다솜의 매력은 <strong>동료 개발자들과의 교류</strong>라고 생각하는데요, 하계, 동계 MT, 비어 네트워킹과 팀 프로젝트 등으로 <strong>친밀감을 쌓으며</strong> ' +
	'여러분이 "<strong>함께 성장하는 개발자</strong>"가 될 수 있을 것이라고 생각합니다. 🌟</p>\n' +
	'<p><strong>지금, 다솜에서 여러분의 가능성을 펼쳐보세요!\n' +
	'더 큰 미래를 그릴 준비가 되셨나요? 다솜은 여러분과 함께합니다.</strong></p>'

/** DB에서 받아올 예시 데이터 */
const examDate: Date = new Date('2025-02-13')

export default ManNewsDetail