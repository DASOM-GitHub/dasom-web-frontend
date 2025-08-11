import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import {
  createInterviewSchedule as createInterviewScheduleApi,
  getRecruitSchedule as fetchRecruitSchedule,
  updateRecruitKeyValue as updateRecruitKeyValueApi,
} from './adminService'

const ManRecruitDate = () => {
  const [dates, setDates] = useState({
    // 모집 기간 (시작일, 종료일)
    RECRUITMENT_PERIOD_START: dayjs('2025-03-01T09:00:00'),
    RECRUITMENT_PERIOD_END: dayjs('2025-03-10T18:00:00'),

    // 1차 합격 (서류) 발표일
    DOCUMENT_PASS_ANNOUNCEMENT: dayjs('2025-03-15T12:00:00'),

    // 면접 기간 (시작일, 종료일)
    INTERVIEW_PERIOD_START: dayjs('2025-03-20T12:00:00'),
    INTERVIEW_PERIOD_END: dayjs('2025-03-20T12:00:00'),

    // 면접 시간 (시작시각, 종료시각)
    INTERVIEW_TIME_START: dayjs('18:00:00', 'HH:mm:ss'),
    INTERVIEW_TIME_END: dayjs('18:00:00', 'HH:mm:ss'),

    // 최종 합격 (면접) 발표일
    INTERVIEW_PASS_ANNOUNCEMENT: dayjs('2025-03-30T17:00:00'),
  })

  const statusMap = {
    RECRUITMENT_PERIOD_START: '모집 시작',
    RECRUITMENT_PERIOD_END: '모집 종료',
    DOCUMENT_PASS_ANNOUNCEMENT: '1차 합격 발표',
    INTERVIEW_PERIOD_START: '면접 시작 날짜',
    INTERVIEW_PERIOD_END: '면접 종료 날짜',
    INTERVIEW_TIME_START: '면접 시작 시간',
    INTERVIEW_TIME_END: '면접 종료 시간',
    INTERVIEW_PASS_ANNOUNCEMENT: '최종 합격 발표',
  }

  const reverseStatusMap = Object.fromEntries(
    Object.entries(statusMap).map(([key, value]) => [value, key])
  )

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const data = await fetchRecruitSchedule()
        const defaultDates = dates

        const newDates = Object.keys(defaultDates).reduce(
          (acc, key) => {
            const found = data.find(
              (item: { key: string; value: string }) => item.key === key
            )
            if (found) {
              acc[key as keyof typeof dates] = key.includes('TIME')
                ? dayjs(found.value, 'HH:mm:ss') // 시간 데이터 형식 변환
                : dayjs(found.value) // 날짜 데이터 변환
            } else {
              acc[key as keyof typeof dates] =
                defaultDates[key as keyof typeof dates]
            }
            return acc
          },
          {} as typeof dates
        )

        setDates(newDates)
      } catch (error) {
        console.error('Failed to fetch dates:', error)
      }
    }

    fetchDates()
  }, [])

  const handleDateChange = (
    key: keyof typeof dates,
    newValue: dayjs.Dayjs | null
  ) => {
    if (newValue) {
      setDates(prevDates => ({
        ...prevDates,
        [key]: newValue,
      }))
    }
  }

  const handleCreateSchedule = async () => {
    try {
      await createInterviewScheduleApi({
        startDate: dates.INTERVIEW_PERIOD_START.format('YYYY-MM-DD'),
        endDate: dates.INTERVIEW_PERIOD_END.format('YYYY-MM-DD'),
        startTime: dates.INTERVIEW_TIME_START.format('HH:mm'),
        endTime: dates.INTERVIEW_TIME_END.format('HH:mm'),
      })
    } catch (e: any) {
      //console.log(e)
      alert('면접 일정 생성 중 오류가 발생했습니다.')
    }
  }

  // 일정 저장
  const handleSave = async (key: keyof typeof dates) => {
    const formattedData = {
      key: key,
      value: key.includes('TIME')
        ? dates[key].format('HH:mm:ss')
        : dates[key].format('YYYY-MM-DDTHH:mm:ss'),
    }

    const token = localStorage.getItem('accessToken')
    //console.log(token)

    try {
      await updateRecruitKeyValueApi(formattedData)

      //console.log(`${key} updated successfully`)
      alert(
        `'${statusMap[key as keyof typeof statusMap]}' 업데이트 되었습니다!`
      )
    } catch (err: any) {
      //console.error(`Failed to update ${key}:`, err)
      alert(`'${statusMap[key as keyof typeof statusMap]}' 업데이트 에러`)

      const errorCode = err.response?.data?.code
      if (errorCode === 'C016') {
        //console.log('날짜 업데이트 중 오류: 날짜 형식이 올바르지 않습니다.')
      }
    }
  }

  return (
    <div className='h-[100vh] w-[100vw] bg-mainBlack font-pretendardRegular text-white flex flex-col items-center'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='mb-[4px] mt-[155px] justify-start w-[380px] text-[20px]'>
          모집 일정 관리
        </div>
        <div className='mt-[10px] w-fit mx-auto p-5 bg-gray-100 rounded-lg shadow-md'>
          <div className='flex flex-col gap-4'>
            {Object.entries(dates).map(([key, value]) => (
              <div key={key} className='flex items-center gap-4'>
                {key.includes('TIME') ? (
                  <TimePicker
                    label={statusMap[key as keyof typeof statusMap]}
                    value={value}
                    onChange={newValue =>
                      handleDateChange(key as keyof typeof dates, newValue)
                    }
                    ampm={false}
                  />
                ) : (
                  <DateTimePicker
                    label={statusMap[key as keyof typeof statusMap]}
                    value={value}
                    onChange={newValue =>
                      handleDateChange(key as keyof typeof dates, newValue)
                    }
                    ampm={false}
                  />
                )}
                <Button
                  variant='contained'
                  onClick={() => handleSave(key as keyof typeof statusMap)}
                >
                  저장
                </Button>
              </div>
            ))}
          </div>
        </div>
      </LocalizationProvider>
      <button
        className='w-[140px] h-[40px] bg-mainColor mt-[15px] font-pretendardBold'
        onClick={handleCreateSchedule}
      >
        면접 일정 생성하기
      </button>
    </div>
  )
}

export default ManRecruitDate
