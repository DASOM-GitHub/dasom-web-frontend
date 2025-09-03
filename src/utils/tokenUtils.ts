// 토큰 저장
export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

// 액세스 토큰 가져오기
export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken')
}

// 리프레시 토큰 가져오기
export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken')
}

// 토큰 제거
export const removeTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

// 토큰 유효성 검사 (간단한 JWT 만료 시간 체크)
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    return payload.exp < currentTime
  } catch {
    return true
  }
}

// 액세스 토큰이 유효한지 확인
export const isAccessTokenValid = (): boolean => {
  const token = getAccessToken()
  if (!token) return false
  return !isTokenExpired(token)
}

// 리프레시 토큰이 유효한지 확인
export const isRefreshTokenValid = (): boolean => {
  const token = getRefreshToken()
  if (!token) return false
  return !isTokenExpired(token)
}
