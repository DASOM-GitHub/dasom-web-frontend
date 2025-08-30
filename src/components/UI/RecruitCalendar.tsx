import React from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { isWithinInterval, addDays, subDays } from 'date-fns'
import { ko } from 'date-fns/locale'

type Period = { start: string | Date; end: string | Date }

function toDate(d: string | Date) {
  if (d instanceof Date) return d
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d)
  if (m) {
    const year = Number(m[1])
    const monthIndex = Number(m[2]) - 1
    const day = Number(m[3])
    return new Date(year, monthIndex, day)
  }
  return new Date(d)
}

function isValidDate(date: Date) {
  return date instanceof Date && !isNaN(date.getTime())
}

function isWithinAnyPeriod(date: Date, periods: Period[]) {
  return periods.some(p => {
    const start = toDate(p.start)
    const end = toDate(p.end)
    if (!isValidDate(start) || !isValidDate(end)) return false
    return isWithinInterval(date, { start, end })
  })
}

function isPrevWithinPeriod(date: Date, periods: Period[]) {
  const prev = subDays(date, 1)
  return isWithinAnyPeriod(prev, periods)
}

function isNextWithinPeriod(date: Date, periods: Period[]) {
  const next = addDays(date, 1)
  return isWithinAnyPeriod(next, periods)
}

function isRowStartInPeriod(date: Date, periods: Period[]) {
  const isIn = isWithinAnyPeriod(date, periods)
  if (!isIn) return false
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || !isPrevWithinPeriod(date, periods)
}

function isRowEndInPeriod(date: Date, periods: Period[]) {
  const isIn = isWithinAnyPeriod(date, periods)
  if (!isIn) return false
  const dayOfWeek = date.getDay()
  return dayOfWeek === 6 || !isNextWithinPeriod(date, periods)
}

interface RecruitCalendarProps {
  // 서류 모집 기간
  periods: Period[]
  // 면접 기간 (선택)
  interviewPeriods?: Period[]
  // 단일 발표일 등 단일 날짜 하이라이트 (선택)
  passDates?: Array<string | Date>
  // 배경 색상 클래스 커스터마이즈 (선택)
  colors?: {
    recruit?: string
    interview?: string
    pass?: string
  }
  months?: number // 데스크톱에서 2, 3 등으로 조절
}

const RecruitCalendar: React.FC<RecruitCalendarProps> = ({
  periods,
  interviewPeriods = [],
  passDates = [],
  colors,
  months = 2,
}) => {
  const recruitBg = colors?.recruit ?? 'bg-[#DBEAFE] text-white'
  const interviewBg = colors?.interview ?? 'bg-[#FDE68A] text-white'
  const passBg = colors?.pass ?? 'bg-[#111827] text-white'

  const passDateObjs = passDates
    .map(toDate)
    .filter((d) => d && d instanceof Date && !isNaN(d.getTime()))

  function isPassDay(date: Date) {
    return passDateObjs.some((d) =>
      date.getFullYear() === d.getFullYear() &&
      date.getMonth() === d.getMonth() &&
      date.getDate() === d.getDate()
    )
  }

  const allStartCandidates: Date[] = []
  const firstRecruitStart = periods.map((p) => toDate(p.start)).find(isValidDate)
  const firstInterviewStart = interviewPeriods
    .map((p) => toDate(p.start))
    .find(isValidDate)
  const firstPass = passDateObjs[0]
  if (firstRecruitStart) allStartCandidates.push(firstRecruitStart)
  if (firstInterviewStart) allStartCandidates.push(firstInterviewStart)
  if (firstPass) allStartCandidates.push(firstPass)
  const defaultMonth = allStartCandidates.length
    ? new Date(Math.min(...allStartCandidates.map((d) => d.getTime())))
    : undefined
  return (
    <DayPicker
      hideNavigation={true}
      weekStartsOn={0}
      locale={ko}
      showOutsideDays
      numberOfMonths={months}
      defaultMonth={defaultMonth}
      modifiers={{
        recruit: (date) => isWithinAnyPeriod(date, periods),
        recruitRowStart: (date) => isRowStartInPeriod(date, periods),
        recruitRowEnd: (date) => isRowEndInPeriod(date, periods),
        interview: (date) => isWithinAnyPeriod(date, interviewPeriods),
        interviewRowStart: (date) => isRowStartInPeriod(date, interviewPeriods),
        interviewRowEnd: (date) => isRowEndInPeriod(date, interviewPeriods),
        passDay: (date) => isPassDay(date),
      }}
      modifiersClassNames={{
        recruit: recruitBg,
        recruitRowStart: 'rounded-l-full',
        recruitRowEnd: 'rounded-r-full',
        interview: interviewBg,
        interviewRowStart: 'rounded-l-full',
        interviewRowEnd: 'rounded-r-full',
        passDay: passBg + ' rounded-full',
      }}
      className="bg-transparent text-white sm:mx-auto md:mx-0"
      classNames={{
        table: 'border-separate border-spacing-y-20 border-spacing-x-0',
        month_grid: 'w-full',
        caption: 'mb-4',
        head_cell: 'text-[#A8A8A8] font-pretendardRegular',
        cell: 'p-0',
        day: 'p-2 h-10 w-10 md:h-11 md:w-11 text-center',
        outside: 'text-subGrey3',
        today: 'ring-1 ring-[#00B493] rounded-full',
        month: 'space-y-4 p-6 bg-subGrey3 rounded-[10%] sm:max-w-[350px] md:min-w-[450px]',
        months: 'flex gap-20 justify-center flex-col md:flex-row',
      }}
    />
  )
}

export default RecruitCalendar