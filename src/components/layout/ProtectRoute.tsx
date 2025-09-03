import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

interface ProtecteRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtecteRouteProps> = ({ children }) => {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#17171B] flex items-center justify-center">
        <div className="text-white text-lg">권한 확인 중...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute