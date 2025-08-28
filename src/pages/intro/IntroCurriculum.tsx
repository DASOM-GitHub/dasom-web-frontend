import React, { useState } from 'react'

// 이 컴포넌트는 사용자가 상단 탭을 클릭하면
// 그에 맞는 커리큘럼 내용을 표시하는 UI를 구현합니다.
const IntroCurriculum: React.FC = () => {
  // 탭과 연결될 데이터를 정의합니다.
  const tabData: { [key: string]: string[] } = {
    'PM': [
        '문제 정의와 프로젝트 주제 선정에 대하여',
        'Desk Research - 데스크 리서치란?',
        '설문조사, 그거 왜 하는건가요?',
        '사용자 모델링',
        '비지니스 전략과 비지니스 모델 설계'
    ],
    'App': [
        '앱 개발 기초: 개발 언어와 기초 개념',
        '앱 개발 기초: 플랫폼이 뭔가요?',
        'UI / UX, 디자인 시스템 알아보기',
        '앱 아키텍처 & 상태관리',
        '성능 관리와 테스트 코드 작성'
    ],
    'Web': ['HTML, CSS, JavaScript 기초',
            'DOM + Event, React 기초',
            'CSS 라이브러리를 리액트에 적용시켜보자',
            'HTTP와 통신',
            '개발 기록 문서화 및 테스트 코드 작성'],
    'Server': [
        'Java 언어 기초 문법 알아보기',
        'RESTful API와 HTTP 통신',
        'DB, ERD 설계 기초',
        'Spring Architecture',
        'API 명세서와 문서화'
    ],
  }

  // 현재 활성화된 탭의 상태를 관리합니다.
  const [activeTab, setActiveTab] = useState<string>('App')

  // 활성화된 탭에 따라 커리큘럼 목록을 렌더링합니다.
  const renderCurriculum = (tabName: string) => {
    // 탭 데이터에 커리큘럼이 있는 경우만 렌더링합니다.
    if (tabData[tabName]) {
      return (
        <div className="space-y-[24px]">
          {tabData[tabName].map((item, index) => (
            <div
              key={index}
              className="bg-[#26262D] flex items-center px-4 sm:px-6 md:px-[54px] w-full max-w-[562px] mx-auto h-auto min-h-[60px] sm:min-h-[72px] py-3 sm:py-0"
            >
                <span className="mr-3 sm:mr-5 text-[#00B493] text-center font-bold text-xl sm:text-2xl md:text-[28px] font-['Inconsolata'] whitespace-nowrap">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-white text-base sm:text-xl md:text-2xl font-pretendardSemiBold leading-normal break-words">
                    {item}
                </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <p className='text-white text-center text-4xl md:text-5xl lg:text-6xl font-pretendardSemiBold leading-tight lg:leading-normal'>
        Curriculum
      </p>
      <p className='mt-4 md:mt-6 text-white text-center text-base md:text-xl lg:text-2xl font-pretendardRegular leading-relaxed px-4'>
        다솜에선 아래 커리큘럼을 통해 다양한 분야의 개발자로 성장이 가능해요.<br className="hidden sm:block" />
        High-level 개발자를 지향하며 이 외에도 DevOps, 게임 등 다양한 분야에 관심있는 부원들이 모여있어요.
      </p>

      <div className="mt-12 md:mt-16 lg:mt-[102px] flex flex-col items-center justify-start mb-[159px] px-4 sm:px-6 py-8">
        <div className="w-full max-w-screen-sm flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-[57px]">
          {Object.keys(tabData).map((tabName) => {
            const isActive = activeTab === tabName
            return (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={`py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl sm:rounded-2xl font-pretendardRegular transition-colors duration-200 whitespace-nowrap
                  ${isActive
                    ? 'bg-[#26262D] text-white shadow-lg'
                    : 'bg-transparent text-white opacity-60 hover:opacity-100'
                  }`}
              >
                {tabName}
              </button>
            )
          })}
        </div>

        {/* 커리큘럼 내용 표시 영역 */}
        <div className="w-full max-w-4xl px-0 sm:px-4">
          {renderCurriculum(activeTab)}
        </div>
      </div>
    </div>
  )
}

export default IntroCurriculum
