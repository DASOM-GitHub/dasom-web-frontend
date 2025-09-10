import { getAccessToken, getRefreshToken, removeTokens, removeAllTokens, isAccessTokenValid, isRefreshTokenValid } from './tokenUtils'

// 인증 상태 관리 서비스
export class AuthService {
  private static instance: AuthService
  private authStateListeners: Array<(isAuthenticated: boolean) => void> = []

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  // 인증 상태 변경 리스너 등록
  public addAuthStateListener(listener: (isAuthenticated: boolean) => void): void {
    this.authStateListeners.push(listener)
  }

  // 인증 상태 변경 리스너 제거
  public removeAuthStateListener(listener: (isAuthenticated: boolean) => void): void {
    this.authStateListeners = this.authStateListeners.filter(l => l !== listener)
  }

  // 모든 리스너에게 인증 상태 변경 알림
  private notifyAuthStateChange(isAuthenticated: boolean): void {
    this.authStateListeners.forEach(listener => {
      try {
        listener(isAuthenticated)
      } catch (error) {
        console.error('Auth state listener error:', error)
      }
    })
  }

  // 현재 인증 상태 확인
  public isAuthenticated(): boolean {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    
    // 토큰이 없는 경우
    if (!accessToken && !refreshToken) {
      return false
    }
    
    // 액세스 토큰이 유효한 경우
    if (accessToken && isAccessTokenValid()) {
      return true
    }
    
    // 액세스 토큰은 만료되었지만 리프레시 토큰이 유효한 경우
    if (refreshToken && isRefreshTokenValid()) {
      return true
    }
    
    // 모든 토큰이 만료된 경우 토큰 제거
    if ((accessToken && !isAccessTokenValid()) && (refreshToken && !isRefreshTokenValid())) {
      console.log('모든 토큰이 만료되었습니다. 토큰을 제거합니다.')
      removeAllTokens()
      this.notifyAuthStateChange(false)
    }
    
    return false
  }

  // 로그아웃 처리
  public logout(): void {
    removeAllTokens()
    this.notifyAuthStateChange(false)
    
    // 로그인 페이지로 리다이렉트
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }

  // 로그인 성공 처리
  public onLoginSuccess(): void {
    this.notifyAuthStateChange(true)
  }

  // 토큰 갱신 실패 처리
  public onTokenRefreshFailure(): void {
    this.logout()
  }
}

// 전역 인스턴스 export
export const authService = AuthService.getInstance()
