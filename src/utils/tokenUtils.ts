// 토큰 저장 방식 설정
type StorageType = 'localStorage' | 'cookie'
const STORAGE_TYPE: StorageType = 'localStorage'
const COOKIE_EXPIRES_DAYS = 7

// 쿠키 유틸리티 함수들
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`
}

const getCookie = (name: string): string | null => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

const removeCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

// 토큰 저장
export const setTokens = (accessToken: string, refreshToken: string) => {
  if (STORAGE_TYPE === 'localStorage') {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  } else {
    setCookie('accessToken', accessToken, COOKIE_EXPIRES_DAYS)
    setCookie('refreshToken', refreshToken, COOKIE_EXPIRES_DAYS)
  }
}

// 액세스 토큰 가져오기
export const getAccessToken = (): string | null => {
  if (STORAGE_TYPE === 'localStorage') {
    return localStorage.getItem('accessToken')
  } else {
    return getCookie('accessToken')
  }
}

// 리프레시 토큰 가져오기
export const getRefreshToken = (): string | null => {
  if (STORAGE_TYPE === 'localStorage') {
    return localStorage.getItem('refreshToken')
  } else {
    return getCookie('refreshToken')
  }
}

// 토큰 제거
export const removeTokens = () => {
  if (STORAGE_TYPE === 'localStorage') {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  } else {
    removeCookie('accessToken')
    removeCookie('refreshToken')
  }
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
