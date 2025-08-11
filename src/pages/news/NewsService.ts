import apiClient from '../../utils/apiClient'
import { NewsItem, NewsDetail } from './Newstype'

export class NewsService {
  private static readonly NEWS_LIST_CACHE_KEY = 'newsList'
  private static readonly NEWS_CACHE_PREFIX = 'news-'

  static async getNewsList(): Promise<NewsItem[]> {
    const cached = sessionStorage.getItem(this.NEWS_LIST_CACHE_KEY)
    if (cached) return JSON.parse(cached)

    const res = await apiClient.get('/news')
    const data: NewsItem[] = res.data
    const sorted = data.sort((a, b) => b.id - a.id)
    sessionStorage.setItem(this.NEWS_LIST_CACHE_KEY, JSON.stringify(sorted))
    return sorted
  }

  static async getNewsDetail(id: string): Promise<NewsDetail> {
    const key = `${this.NEWS_CACHE_PREFIX}${id}`
    const cached = sessionStorage.getItem(key)
    if (cached) return JSON.parse(cached)

    const res = await apiClient.get(`/news/${id}`)
    const data: NewsDetail = res.data
    sessionStorage.setItem(key, JSON.stringify(data))
    return data
  }

  static clearCache(): void {
    sessionStorage.removeItem(this.NEWS_LIST_CACHE_KEY)
    Object.keys(sessionStorage).forEach(k => {
      if (k.startsWith(this.NEWS_CACHE_PREFIX)) sessionStorage.removeItem(k)
    })
  }
}
