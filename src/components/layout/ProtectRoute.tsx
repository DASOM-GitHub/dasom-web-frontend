import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProtecteRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtecteRouteProps> = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      alert('권한이 필요한 페이지입니다.')
      navigate('/') // 메인 페이지로 리다이렉트
    }
  }, [navigate])

  return <>{children}</>
}

export default ProtectedRoute
