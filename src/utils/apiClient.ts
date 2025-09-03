import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, getRefreshToken, setTokens, removeTokens } from './tokenUtils'

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
    if (!refreshToken) return null

    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken
    })

    const newAccessToken = response.data.accessToken
    const newRefreshToken = response.data.refreshToken

    if (newAccessToken && newRefreshToken) {
      setTokens(newAccessToken, newRefreshToken)
      return newAccessToken
    }
    return null
  } catch (error) {
    console.error('토큰 갱신 실패:', error)
    removeTokens()
    return null
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

    // 401 에러이고 토큰 갱신을 시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
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
      }
    }

    // 401 에러가 지속되면 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      removeTokens()
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
