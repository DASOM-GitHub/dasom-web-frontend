import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL =
  (process.env.DASOM_BASE_URL as string) ||
  (process.env.REACT_APP_API_BASE_URL as string) ||
  'https://dmu-dasom-api.or.kr/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

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
    // 401 등의 공통 에러 처리 필요 시 이곳에서 수행 가능
    return Promise.reject(error)
  }
)

export default apiClient
