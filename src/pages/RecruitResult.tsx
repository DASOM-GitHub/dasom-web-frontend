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
	const [pass, setPass] = useState<string | null>(null)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target

		const onlyNumbers = value.replace(/\D/g, '')
		
		setCheckInput((prevState) => {
			let newValue = onlyNumbers
	
			if (name === 'studentNo') {
				newValue = onlyNumbers.slice(0, 8) // 학번은 최대 8자리
			} else if (name === 'contact') {
				newValue = onlyNumbers.slice(0, 4) // 전화번호 마지막 4자리는 최대 4자리
			}
	
			return {
				...prevState,
				[name]: newValue,
		}})
	}

	// 합격여부 조회 일정 확인 후 검색 type 지정
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<recruitData[]>('https://dmu-dasom-api.or.kr/api/recruit')
				const interviewPass = new Date(response.data.find((item) => item.key === 'INTERVIEW_PASS_ANNOUNCEMENT')?.value.substring(0, 10) || '')
				const documentPass = new Date(response.data.find((item) => item.key === 'DOCUMENT_PASS_ANNOUNCEMENT')?.value.substring(0, 10) || '')
				const today = new Date()
				//console.log(response.data)

				// 현재 날짜에 따른 조회 type 지정
				setPass(today >= interviewPass ? 'INTERVIEW_PASS' : today >= documentPass ? 'DOCUMENT_PASS' : null)
			} catch (e) {
				console.log(e)
				alert('발표 일정을 조회할 수 없습니다')
			}
		}
		fetchData()
	}, [])

	// 합격 여부 조회 후 페이지 이동
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!checkInput.studentNo.trim()) {
			alert('학번을 입력해주세요.')
			return
		}

		if (!checkInput.contact.trim()) {
			alert('전화번호 마지막 4자리를 입력해주세요.')
			return
		}

		if (!pass) {
			alert('합격 발표일이 아닙니다.')
			return
		}

		try {
			const response = await axios.get('https://dmu-dasom-api.or.kr/api/recruit/result', {
				params: {
					type: pass, // 현재 날짜에 따른 검색 type
					studentNo: checkInput.studentNo,
					contactLastDigit: checkInput.contact,
				},
			})

			const resData: responseData = {
				name: response.data.name,
				isPassed: response.data.isPassed,
			}

			// 조회 type에 따라 이동 url 다르게
			navigate(`/recruit/${pass === 'DOCUMENT_PASS' ? 'check' : 'check/final'}`, {
				state: {
					name: resData.name,
					isPassed: resData.isPassed,
					studentNo: checkInput.studentNo,
					contactLastDigit: checkInput.contact
				},
			})
		} catch (e) {
			console.log(e)
			alert('데이터 검색 불가')
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()

			const form = e.currentTarget.form
			if (!form) return

			const elements = Array.from(form.elements) as (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[]
			const index = elements.indexOf(e.currentTarget)

			for (let i = index + 1; i < elements.length; i++) {
				const nextElement = elements[i]
				if ((nextElement instanceof HTMLInputElement || nextElement instanceof HTMLTextAreaElement) && nextElement.readOnly) {
					continue
				}

				if (!nextElement.disabled) {
					nextElement.focus()
					break
				}
			}
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
					onKeyDown={handleKeyPress}
				/>
				<InputField
					label='전화번호 마지막 4자리를 입력해주세요.'
					subLabel='ex) 0542'
					type='text'
					name='contact'
					value={checkInput.contact}
					onChange={handleInputChange}
					onKeyDown={handleKeyPress}
				/>
				<Button text='결과 확인하기' />
			</form>
		</MobileLayout>
	)
}
