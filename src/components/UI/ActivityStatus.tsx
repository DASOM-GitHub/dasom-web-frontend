import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DasomLogo from '../../assets/images/dasomLogo.svg'
import { ActivityStatusProps, ActivitySection } from './types'
import axios from 'axios'

interface ApiActivity {
  id: number
  monthDay: string
  title: string
  award: string | null
}

interface ApiSection {
  id: number
  section: string
  activities: ApiActivity[]
}

interface ApiYearData {
  year: number
  sections: ApiSection[]
}

const FadeInSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
)

const ActivityStatus: React.FC<ActivityStatusProps> = ({
  year,
  activityData: customActivityData,
  className = '',
}) => {
  const [apiData, setApiData] = useState<ActivitySection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)

        const response = await axios.get<ApiYearData[]>(
          'https://api.dmu-dasom.or.kr/api/activities'
        )

        const result = response.data

        const currentYearData = result.find(
          item => item.year === Number(year)
        )

        if (!currentYearData) {
          setApiData([])
          return
        }

        const transformed: ActivitySection[] =
          currentYearData.sections.map(section => ({
            category: section.section,
            items: section.activities.map(activity => ({
              title: activity.title,
              award: activity.award ?? undefined,
              subtitle: activity.monthDay
                ? `(${activity.monthDay})`
                : undefined,
            })),
          }))

        setApiData(transformed)
      } catch (error) {
        console.error('활동 데이터 불러오기 실패:', error)
        setApiData([])
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [year])

  const defaultActivityData2024: ActivitySection[] = []
  const defaultActivityData2025: ActivitySection[] = []

  const data =
    customActivityData ||
    (apiData.length > 0
      ? apiData
      : year === '2025'
      ? defaultActivityData2025
      : defaultActivityData2024)

  if (loading) {
    return <div className="text-white text-center py-10">Loading...</div>
  }

  return (
    <FadeInSection key={year}>
      <div
        className={`max-w-[400px] bg-mainBlack p-4 rounded-xl text-white ${className}`}
      >
        {/* 헤더 */}
        <div className="flex items-center gap-2 mb-6">
          <img src={DasomLogo} className="w-7 h-7" alt="Dasom Icon" />
          <div>
            <div className="text-[16px] font-pretendardBold">
              활동 현황
            </div>
            <div className="text-mainColor text-[13px] font-pretendardSemiBold">
              {year}
            </div>
          </div>
        </div>

        {/* 타임라인 */}
        <div className="relative">
          {/* 세로 라인 */}
          <div className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-mainColor/30" />

          <div className="space-y-6">
            {data.map((section, index) => (
              <FadeInSection key={index}>
                <div className="flex gap-4">
                  
                  {/* 점 */}
                  <div className="relative flex justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-mainColor mt-[3px]" />
                  </div>

                  {/* 콘텐츠 */}
                  <div className="flex-1">
                    <div className="text-white text-[12px] font-pretendardBold mb-1">
                      {section.category}
                    </div>

                    <ul className="space-y-1">
                      {section.items.map((activity, idx) => (
                        <li
                          key={idx}
                          className="flex flex-wrap text-[10.5px] leading-tight"
                        >
                          {activity.award && (
                            <span className="font-pretendardBold text-mainColor mr-1">
                              {activity.award}
                            </span>
                          )}
                          {activity.title && (
                            <span className="font-pretendardRegular">
                              {activity.title}
                            </span>
                          )}
                          {activity.subtitle && (
                            <span className="text-subGrey font-pretendardRegular ml-1">
                              {activity.subtitle}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export default ActivityStatus