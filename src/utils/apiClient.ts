import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, getRefreshToken, setTokens, removeTokens } from './tokenUtils'
import { authService } from './authService'

const API_BASE_URL =
  (process.env.DASOM_BASE_URL as string) ||
  (process.env.REACT_APP_API_BASE_URL as string) ||
  'https://dmu-dasom-api.or.kr/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

// 토큰 갱신 중복 요청 방지를 위한 플래그
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: string | null) => void
  reject: (reason?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  
  failedQueue = []
}

// 리프레시 토큰으로 새로운 액세스 토큰을 요청하는 함수
const refreshAccessToken = async (): Promise<string | null> => {
  if (isRefreshing) {
    // 이미 토큰 갱신 중인 경우 대기열에 추가
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject })
    })
  }

  isRefreshing = true

  try {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      processQueue(new Error('No refresh token'), null)
      return null
    }

    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken
    })

    const newAccessToken = response.data.accessToken
    const newRefreshToken = response.data.refreshToken

    if (newAccessToken && newRefreshToken) {
      setTokens(newAccessToken, newRefreshToken)
      processQueue(null, newAccessToken)
      return newAccessToken
    }
    
    processQueue(new Error('Invalid token response'), null)
    return null
  } catch (error: any) {
    console.error('토큰 갱신 실패:', error)
    
    // 리프레시 토큰도 만료된 경우 (401, 403 등)
    if (error.response?.status === 401 || error.response?.status === 403) {
      processQueue(error, null)
      authService.onTokenRefreshFailure()
      return null
    }
    
    processQueue(error, null)
    return null
  } finally {
    isRefreshing = false
  }
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken()

    // 헤더 객체가 존재하도록 보장
    config.headers = config.headers || {}

    // 명시적으로 제공되지 않은 경우 Authorization 헤더 자동 부착
    if (accessToken && !config.headers['Authorization']) {
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
  response => response,
  async error => {
    const originalRequest = error.config
    const status = error.response?.status

    // 인증 관련 에러 코드들 (백엔드와 협의된 코드)
    const authErrorCodes = [401, 403]
    
    // 인증 에러이고 토큰 갱신을 시도하지 않은 경우
    if (authErrorCodes.includes(status) && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const newAccessToken = await refreshAccessToken()
        if (newAccessToken) {
          // 새로운 토큰으로 원래 요청 재시도
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        console.error('토큰 갱신 중 오류:', refreshError)
        // 토큰 갱신 실패 시 로그아웃 처리는 refreshAccessToken 함수에서 처리됨
        return Promise.reject(refreshError)
      }
    }

    // 토큰 갱신 후에도 인증 에러가 지속되면 로그아웃
    if (authErrorCodes.includes(status) && originalRequest._retry) {
      authService.logout()
    }

    return Promise.reject(error)
  }
)

export default apiClient
