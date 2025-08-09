import React, { useState } from 'react'
import apiClient from '../utils/apiClient'
import MobileLayout from '../components/layout/MobileLayout'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      alert('아이디와 비밀번호를 입력하세요.')
      return
    }

    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      })

      const accessToken = response.headers['access-token']
      const refreshToken = response.headers['refresh-token']
      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
      }

      //console.log('로그인 성공:', response.data)

      const authority = response.headers['authority']
      //console.log(authority)
      if (authority === 'ROLE_ADMIN') {
        navigate('/admin')
      } else {
        navigate('/usermain')
      }
    } catch (err: any) {
      const errorCode = err.response?.data?.code
      if (errorCode === 'C005') {
        alert('이메일 또는 비밀번호가 잘못되었습니다.')
      } else {
        alert('로그인 실패. 다시 시도해주세요.')
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <MobileLayout>
      <div className='h-screen flex flex-col items-center justify-center'>
        <div className='font-pretendardBlack text-mainColor text-2xl mb-[32px]'>
          DASOM
        </div>
        <div className='w-full text-[12px] flex flex-col items-center font-pretendardRegular'>
          <input
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='bg-subGrey h-[32px] w-[80%] rounded-[6px] mb-[16px] pl-[12px] outline-mainColor focus:ring-1 ring-white'
            placeholder='Email'
            onKeyDown={handleKeyDown}
          />
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='bg-subGrey h-[32px] w-[80%] rounded-[6px] mb-[16px] pl-[12px] outline-mainColor focus:ring-1 ring-white'
            placeholder='Password'
            onKeyDown={handleKeyDown}
          />
          <div
            className='cursor-pointer bg-mainColor h-[32px] w-[80%] rounded-[6px] font-pretendardBold tracking-[1px] text-white flex justify-center items-center hover:bg-[#00A889]'
            onClick={handleLogin}
          >
            로그인
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

export default Login
