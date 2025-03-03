import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const sendResultMail = async (mailType : any) => {
    const confirmation = window.confirm(`${mailType === 'DOCUMENT_RESULT' ? '서류' : '면접접'} 합격자에게 메일을 보낼까요?`)
    if (!confirmation) return
    const accessToken = localStorage.getItem('accessToken')

    try {
        await axios.post('https://dmu-dasom-api.or.kr/api/admin/applicants/send-mail', { mailType }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        toast.success(`${mailType === 'DOCUMENT_RESULT' ? '서류' : '면접'} 합격자에게 메일을 발송했습니다.`)
    } catch (error) {
        toast.error('메일 발송에 실패했습니다.')
        console.error('메일 발송 오류:', error)
    }
}

const MailButtons = () => {
    return (
        <div className='mt-[12px]'>
            <button 
                className='cursor-pointer px-2 py-1 bg-gray-700 text-white rounded-lg mr-3'
                onClick={() => sendResultMail('DOCUMENT_RESULT')}
            >
                서류 합격자 메일 발송
            </button>
            <button 
                className='cursor-pointer px-2 py-1 bg-gray-700 text-white rounded-lg'
                onClick={() => sendResultMail('FINAL_RESULT')}
            >
                면접 합격자 메일 발송
            </button>
        </div>
    )
}

export default MailButtons