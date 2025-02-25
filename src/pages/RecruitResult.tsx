import React, { useEffect, useState } from 'react'
import MobileLayout from '../components/layout/MobileLayout'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/UI/Recruit_Button'
import { RecruitHeader } from '../components/UI/RecruitUI'
import { InputField } from '../components/UI/Recruit_InputField'
import axios from 'axios'

interface recruitData {
	key: string
	value: string
}

interface responseData {
	name: string
	isPassed: boolean
}

export const RecruitResult: React.FC = () => {
	const navigate = useNavigate()
	const [checkInput, setCheckInput] = useState({
		studentNo: '',
		contact: '',
	})
	const [pass, setPass] = useState<string | null>()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setCheckInput((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

  // 합격여부 조회 일정 확인 후 검색 type 지정
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<recruitData[]>('https://dmu-dasom.or.kr/api/recruit')
				const interviewPass = new Date(response.data.find((item) => item.key === 'INTERVIEW_PASS_ANNOUNCEMENT')?.value.substring(0, 10) || '')
				const documentPass = new Date(response.data.find((item) => item.key === 'DOCUMENT_PASS_ANNOUNCEMENT')?.value.substring(0, 10) || '')
				const today = new Date()
				console.log(response.data)

        // 현재 날짜에 따른 조회 type 지정
				if (today >= interviewPass) {
					setPass('INTERVIEW_PASS')
				} else if (today >= documentPass) {
					setPass('DOCUMENT_PASS')
				} else {
          alert('합격 발표일이 아닙니다')
        }
			} catch(e) {
        console.log(e)
        alert('발표 일정을 조회할 수 없습니다')
      }
		}
    fetchData()
	}, [])

	// 합격 여부 조회 후 페이지 이동
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const response = await axios.get('https://dmu-dasom.or.kr/api/recruit/result', {
				params: {
					type: pass, // 현재 날짜에 따른 검색 type
					studentNo: checkInput.studentNo,
					contactLastDigit: checkInput.contact,
				},
			})
			console.log(response.data)
			console.log(response.data.isPassed)
			const resData: responseData = {
				name: response.data.name,
				isPassed: response.data.isPassed,
			}

      // 조회 type에 따라 이동 url 다르게 
			navigate(`/recruit/${pass === 'DOCUMENT_PASS' ? 'check' :'check/final' }`, {
				state: {
					name: resData.name,
					isPassed: resData.isPassed,
				},
			})
		} catch (e) {
			console.log(e)
			alert('데이터 검색 불가')
		}
	}

	return (
		<MobileLayout>
			<RecruitHeader title='컴퓨터 소프트웨어 공학과 전공 동아리 다솜 34기 합격자 조회' />
			<form className='mt-4 bg-mainBlack w-full px-2' onSubmit={handleSubmit}>
				<InputField
					label='지원하실때 입력하셨던 학번을 입력해주세요.'
					subLabel='ex) 20250001'
					type='text'
					name='studentNo'
					value={checkInput.studentNo}
					onChange={handleInputChange}
				/>
				<InputField label='전화번호 마지막 4자리를 입력해주세요.' subLabel='ex) 0542' type='text' name='contact' value={checkInput.contact} onChange={handleInputChange} />
				<Button text='결과 확인하기' />
			</form>
		</MobileLayout>
	)
}
