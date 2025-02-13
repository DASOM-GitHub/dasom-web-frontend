import React from 'react'
import DasomLogo from '../../assets/images/dasomLogo.svg'
import ActivityBar from '../../assets/images/activityBar.svg'

type ActivityItem = {
  title?: string
  award?: string
  subtitle?: string
}

type ActivitySection = {
  category: string
  items: ActivityItem[]
}

const ActivityStatus: React.FC<{ year: string }> = ({ year }) => {
  const activityData: ActivitySection[] = [
    {
      category: '코엑스 한국전자전',
      items: [
        {
          award: '장려상',
          subtitle: '2024 동양미래 EXPO'
        }
      ]
    },
    {
      category: '외부 경진대회 / 전시회',
      items: [
        {
          award: '동상',
          subtitle: '교육장비 개발 및 아이디어 경진대회',
        }
      ]
    },
    {
      category: '교내 경진대회',
      items: [
        {
          award: '최우수상',
          subtitle: '컴퓨터 공학부 경진대회',
        }
      ]
    },
    {
      category: '세미나 실적',
      items: [
        { title: '현직 백엔드 개발자 특강 - ', subtitle: '20명 대상' },
        { title: '웹 개발 세미나 - ', subtitle: '10명 대상' }
      ]
    },
    {
      category: '기타 활동',
      items: [
        { title: '컴퓨터공학부 최초 해커톤 개최' },
        { title: '전공동아리 내부 팀 프로젝트 발표회 개최' },
        { title: 'DASOM MAKERS 스터디 및 홈페이지 제작' },
        { title: '시험기간 간식 행사' },
        { title: '할로윈 행사' },
        { title: '동계, 하계 MT' }
      ]
    }
  ]

  return (
    <div className='max-w-[400px] bg-mainBlack p-4 rounded-xl text-white'>
      <div className='flex items-center gap-2 mb-3'>
        <img
          src={DasomLogo}
          className='w-7 h-7'
          alt='Dasom Icon'
        />
        <div>
          <div className='text-[16px] font-pretendardBold'>활동 현황</div>
          <div className='text-mainColor text-[13px] font-pretendardSemiBold'>{year}</div>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <img src={ActivityBar} className="w-4 h-[300px] mt-1.5" alt="Activitybar" />
        <div className="space-y-3">
          {activityData.map((section, index) => (
            <div key={index}>
              <div className='text-white text-[12px] font-pretendardBold'>
                {section.category}
              </div>
              <ul className='space-y-1'>
                {section.items.map((activity, idx) => (
                  <li key={idx} className='flex flex-wrap text-[10.5px] leading-tight'>
                    {activity.title && (
                      <span className='font-pretendardRegular'>{activity.title}</span>
                    )}
                    {activity.award && (
                      <span className='font-pretendardBold text-mainColor mr-1'>{activity.award}</span>
                    )}
                    {activity.subtitle && (
                      <span className='text-subGrey font-pretendardRegular'>{' '}{activity.subtitle}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActivityStatus