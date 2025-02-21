import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import axios from 'axios'

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
        INTERVIEW_TIME_START: dayjs('T10:00:00'),
        INTERVIEW_TIME_END: dayjs('T10:00:00'),

        // 최종 합격 (면접) 발표일
        INTERVIEW_PASS_ANNOUNCEMENT: dayjs('2025-03-30T17:00:00')
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

    // useEffect(() => {
    //     const fetchDates = async () => {
    //         try {
    //             const token = localStorage.getItem('accessToken')
    //             const response = await axios.get('https://dmu-dasom.or.kr/api/service', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             })

    //             const data = response.data || []
    //             const defaultDates = {
    //                 RECRUITMENT_PERIOD_START: dayjs(),
    //                 RECRUITMENT_PERIOD_END: dayjs(),
    //                 DOCUMENT_PASS_ANNOUNCEMENT: dayjs(),
    //                 INTERVIEW_PERIOD_START: dayjs(),
    //                 INTERVIEW_PERIOD_END: dayjs(),
    //                 INTERVIEW_TIME_START: dayjs(),
    //                 INTERVIEW_TIME_END: dayjs(),
    //                 INTERVIEW_PASS_ANNOUNCEMENT: dayjs(),
    //             }

    //             const newDates = Object.keys(defaultDates).reduce((acc, key) => {
    //                 const found = data.find(item => item.key === key)
    //                 acc[key] = found ? dayjs(found.value) : defaultDates[key]
    //                 return acc
    //             }, {})

    //             setDates(newDates)
    //         } catch (error) {
    //             console.error('Failed to fetch dates:', error)
    //         }
    //     }

    //     fetchDates()
    // }, [])

    const handleDateChange = (key: keyof typeof dates, newValue: dayjs.Dayjs | null) => {
        if (newValue) {
            setDates(prevDates => ({
                ...prevDates,
                [key]: newValue
            }))
        }
    }

    // 일정 저장
    const handleSave = async (key: keyof typeof dates) => {
        const formattedData = {
            key: key,
            value: dates[key],
            description: statusMap[key as keyof typeof statusMap]
        }
    
        const token = localStorage.getItem('accessToken')
    
        try {
            await axios.patch(`https://dmu-dasom.or.kr/api/service/${key}`, formattedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
    
            console.log(`${key} updated successfully`)
            alert(`'${statusMap[key as keyof typeof statusMap]}' 업데이트 되었습니다!`)
        } catch (error) {
            console.error(`Failed to update ${key}:`, error)
            alert(`'${statusMap[key as keyof typeof statusMap]}' 업데이트 에러`)
        }
    }    

    return (
        <div className='h-[100vh] w-[100vw] bg-mainBlack font-pretendardRegular text-white flex flex-col items-center'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='mb-[4px] mt-[155px] justify-start w-[380px] text-[20px]'>
                    모집 일정 관리
                </div>
                <div className="mt-[10px] w-fit mx-auto p-5 bg-gray-100 rounded-lg shadow-md">
                    <div className="flex flex-col gap-4">
                        {Object.entries(dates).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-4">
                                <DateTimePicker
                                    label={statusMap[key as keyof typeof statusMap]}
                                    value={value}
                                    onChange={(newValue) => handleDateChange(key as keyof typeof dates, newValue)}
                                    ampm={false}
                                />
                                <Button variant="contained" onClick={() => handleSave(key as keyof typeof statusMap)}>
                                    저장
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </LocalizationProvider>
        </div>
    )
}

export default ManRecruitDate
