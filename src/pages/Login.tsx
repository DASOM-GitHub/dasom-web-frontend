import React, { useState } from 'react'
import apiClient from '../utils/apiClient'
import { useNavigate } from 'react-router-dom'
import { setTokens } from '../utils/tokenUtils'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      alert('아이디와 비밀번호를 입력하세요.')
      return
    }

    setIsLoading(true)

    try {
      const response = await apiClient.post('/auth/admin-login', {
        email,
        password,
      })

      console.log('로그인 응답:', response)
      console.log('응답 헤더:', response.headers)
      console.log('응답 데이터:', response.data)

      // 백엔드에서 헤더로 토큰을 전송하는 경우
      const accessToken = response.headers['access-token'] || response.headers['accessToken']
      const refreshToken = response.headers['refresh-token'] || response.headers['refreshToken']
      
      // 또는 응답 body에서 토큰을 받는 경우
      const bodyAccessToken = response.data?.accessToken
      const bodyRefreshToken = response.data?.refreshToken
      
      // 최종 토큰 결정 (헤더 우선, 없으면 body에서)
      const finalAccessToken = accessToken || bodyAccessToken
      const finalRefreshToken = refreshToken || bodyRefreshToken
      
      if (finalAccessToken && finalRefreshToken) {
        // 로컬 스토리지에 토큰 저장
        setTokens(finalAccessToken, finalRefreshToken)
        
        console.log('로그인 성공: 토큰이 저장되었습니다.')
        console.log('저장된 액세스 토큰:', finalAccessToken)
        console.log('저장된 리프레시 토큰:', finalRefreshToken)
        
        // 로그인 성공 시 어드민 페이지로 이동
        navigate('/admin')
      } else {
        console.error('토큰을 찾을 수 없습니다.')
        console.error('헤더 액세스 토큰:', accessToken)
        console.error('헤더 리프레시 토큰:', refreshToken)
        console.error('바디 액세스 토큰:', bodyAccessToken)
        console.error('바디 리프레시 토큰:', bodyRefreshToken)
        alert('토큰을 받지 못했습니다. 다시 시도해주세요.')
      }
    } catch (err: any) {
      console.error('로그인 오류:', err)
      
      const errorCode = err.response?.data?.code
      if (errorCode === 'C005') {
        alert('이메일 또는 비밀번호가 잘못되었습니다.')
      } else if (err.response?.status === 401) {
        alert('인증에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
      } else if (err.response?.status === 403) {
        alert('접근 권한이 없습니다.')
      } else {
        alert('로그인 실패. 다시 시도해주세요.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      handleLogin()
    }
  }

  return (
    <div className='min-h-screen w-full bg-black flex flex-col items-center justify-center'>
      <div className='font-pretendardBlack text-mainColor text-2xl mb-[32px]'>
        DASOM
      </div>
      <div className='w-full text-[12px] flex flex-col items-center font-pretendardRegular'>
        <input
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='bg-subGrey h-[32px] w-[80%] max-w-[300px] rounded-[6px] mb-[16px] pl-[12px] outline-mainColor focus:ring-1 ring-white'
          placeholder='Email'
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          className='bg-subGrey h-[32px] w-[80%] max-w-[300px] rounded-[6px] mb-[16px] pl-[12px] outline-mainColor focus:ring-1 ring-white'
          placeholder='Password'
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <div
          className={`cursor-pointer h-[32px] w-[80%] max-w-[300px] rounded-[6px] font-pretendardBold tracking-[1px] text-white flex justify-center items-center transition-colors ${
            isLoading 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-mainColor hover:bg-[#00A889]'
          }`}
          onClick={isLoading ? undefined : handleLogin}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </div>
      </div>
    </div>
  )
}

export default Login
