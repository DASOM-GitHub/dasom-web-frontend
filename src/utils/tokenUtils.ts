// 토큰 저장 (로컬 스토리지 사용)
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

// 토큰 제거 (로컬 스토리지에서)
export const removeTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

// 모든 토큰 제거 (로컬 스토리지 + 쿠키)
export const removeAllTokens = () => {
  // 로컬 스토리지에서 토큰 제거
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  
  // 쿠키에서도 토큰 제거
  removeTokensFromCookie()
  
  console.log('모든 토큰이 제거되었습니다.')
}

// 쿠키에 토큰 저장 (보안 강화 옵션)
export const setTokensInCookie = (accessToken: string, refreshToken: string) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)) // 7일
  
  document.cookie = `accessToken=${accessToken}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`
  document.cookie = `refreshToken=${refreshToken}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`
}

// 쿠키에서 토큰 가져오기
export const getAccessTokenFromCookie = (): string | null => {
  const name = 'accessToken='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return null
}

export const getRefreshTokenFromCookie = (): string | null => {
  const name = 'refreshToken='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return null
}

// 쿠키에서 토큰 제거
export const removeTokensFromCookie = () => {
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
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
