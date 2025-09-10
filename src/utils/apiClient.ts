import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, getRefreshToken, setTokens, removeTokens, removeAllTokens } from './tokenUtils'

const API_BASE_URL =
  (process.env.DASOM_BASE_URL as string) ||
  (process.env.REACT_APP_API_BASE_URL as string) ||
  'https://dmu-dasom-api.or.kr/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

// 리프레시 토큰으로 새로운 액세스 토큰을 요청하는 함수
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      console.log('리프레시 토큰이 없습니다.')
      return null
    }

    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken
    })

    // 백엔드에서 새로운 토큰들을 응답으로 받음
    const newAccessToken = response.data.accessToken
    const newRefreshToken = response.data.refreshToken

    if (newAccessToken && newRefreshToken) {
      // 새로운 토큰들을 로컬 스토리지에 저장
      setTokens(newAccessToken, newRefreshToken)
      console.log('토큰이 성공적으로 갱신되었습니다.')
      return newAccessToken
    }
    
    console.log('토큰 갱신 응답에서 유효한 토큰을 받지 못했습니다.')
    return null
  } catch (error: any) {
    console.error('토큰 갱신 실패:', error)
    
    // 리프레시 토큰이 유효하지 않은 경우 (401, 403 등)
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('리프레시 토큰이 유효하지 않습니다. 로그아웃 처리합니다.')
      removeAllTokens()
    }
    
    return null
  }
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken()

    // 헤더 객체가 존재하도록 보장
    config.headers = config.headers || {}

    // 로그인 관련 요청에는 토큰을 추가하지 않음
    const isAuthRequest = config.url?.includes('/auth/') && 
                         (config.url?.includes('login') || config.url?.includes('refresh'))
    
    // 명시적으로 제공되지 않은 경우 Authorization 헤더 자동 부착 (로그인 요청 제외)
    if (accessToken && !config.headers['Authorization'] && !isAuthRequest) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    // JSON 요청에 대한 기본 헤더 설정
    // FormData 업로드는 브라우저/axios가 경계(boundary)를 자동 설정하도록 둠
    const isFormData =
      typeof FormData !== 'undefined' && config.data instanceof FormData
    if (!isFormData) {
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json'
      }
    }
    if (!config.headers['Accept']) {
      config.headers['Accept'] = 'application/json'
    }

    return config
  },
  error => Promise.reject(error)
)

apiClient.interceptors.response.use(
  response => {
    // 정상 응답 시 그대로 반환
    return response
  },
  async error => {
    const originalRequest = error.config

    // 401 Unauthorized 에러이고 토큰 갱신을 시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      console.log('액세스 토큰이 만료되었습니다. 리프레시 토큰으로 갱신을 시도합니다.')

      try {
        const newAccessToken = await refreshAccessToken()
        
        if (newAccessToken) {
          // 새로운 액세스 토큰으로 원래 요청 재시도
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          console.log('새로운 액세스 토큰으로 요청을 재시도합니다.')
          return apiClient(originalRequest)
        } else {
          console.log('토큰 갱신에 실패했습니다. 로그인 페이지로 리다이렉트합니다.')
          // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
          removeAllTokens()
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        }
      } catch (refreshError) {
        console.error('토큰 갱신 중 오류 발생:', refreshError)
        removeAllTokens()
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
    }

    // 401 에러가 지속되거나 다른 인증 관련 에러인 경우
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('인증이 필요합니다. 로그인 페이지로 리다이렉트합니다.')
      removeAllTokens()
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
