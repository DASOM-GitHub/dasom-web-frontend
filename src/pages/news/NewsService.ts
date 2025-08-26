import apiClient from '../../utils/apiClient'
import { NewsItem, NewsDetail } from './Newstype'

const NEWS_LIST_CACHE_KEY = 'newsList'
const NEWS_CACHE_PREFIX = 'news-'

export const getNewsList = async (): Promise<NewsItem[]> => {
  const cached = sessionStorage.getItem(NEWS_LIST_CACHE_KEY)
  if (cached) return JSON.parse(cached)

  const res = await apiClient.get('/news')
  const data: NewsItem[] = res.data
  const sorted = data.sort((a, b) => b.id - a.id)
  sessionStorage.setItem(NEWS_LIST_CACHE_KEY, JSON.stringify(sorted))
  return sorted
}

export const getNewsDetail = async (id: string): Promise<NewsDetail> => {
  const key = `${NEWS_CACHE_PREFIX}${id}`
  const cached = sessionStorage.getItem(key)
  if (cached) return JSON.parse(cached)

  const res = await apiClient.get(`/news/${id}`)
  const data: NewsDetail = res.data
  sessionStorage.setItem(key, JSON.stringify(data))
  return data
}

export const clearNewsCache = (): void => {
  sessionStorage.removeItem(NEWS_LIST_CACHE_KEY)
  Object.keys(sessionStorage).forEach(k => {
    if (k.startsWith(NEWS_CACHE_PREFIX)) sessionStorage.removeItem(k)
  })
}
