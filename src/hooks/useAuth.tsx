import { useState, useEffect } from 'react'
import { authService } from '../utils/authService'

// 인증 상태를 관리하는 커스텀 훅
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // 초기 인증 상태 확인
    const checkInitialAuth = () => {
      const authenticated = authService.isAuthenticated()
      setIsAuthenticated(authenticated)
      setIsLoading(false)
    }

    // 인증 상태 변경 리스너
    const handleAuthStateChange = (authenticated: boolean) => {
      setIsAuthenticated(authenticated)
    }

    // 초기 상태 확인
    checkInitialAuth()

    // 리스너 등록
    authService.addAuthStateListener(handleAuthStateChange)

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      authService.removeAuthStateListener(handleAuthStateChange)
    }
  }, [])

  const logout = () => {
    authService.logout()
  }

  return {
    isAuthenticated,
    isLoading,
    logout
  }
}
