import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAccessTokenValid, isRefreshTokenValid, removeTokens } from '../../utils/tokenUtils'

interface ProtecteRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtecteRouteProps> = ({ children }) => {
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 액세스 토큰이 유효한지 확인
        if (isAccessTokenValid()) {
          setIsAuthorized(true)
          setIsChecking(false)
          return
        }

        // 리프레시 토큰이 유효한지 확인
        if (isRefreshTokenValid()) {
          // 리프레시 토큰이 있지만 액세스 토큰이 만료된 경우
          // apiClient의 인터셉터가 자동으로 토큰을 갱신
          setIsAuthorized(true)
          setIsChecking(false)
          return
        }

        // 토큰이 유효하지 않은 경우
        removeTokens()
        alert('로그인이 필요합니다.')
        navigate('/login')
      } catch (error) {
        console.error('인증 확인 중 오류:', error)
        removeTokens()
        alert('인증 확인 중 오류가 발생했습니다.')
        navigate('/login')
      } finally {
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [navigate])

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#17171B] flex items-center justify-center">
        <div className="text-white text-lg">권한 확인 중...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute