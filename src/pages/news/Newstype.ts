export interface ImageData {
  encodedData: string
  fileFormat: string
}

export interface NewsItem {
  id: number
  title: string
  image: ImageData | null
  content: string
  createdAt: string
}

export interface NewsDetail {
  id: number
  title: string
  content: string
  images: { encodedData: string; fileFormat: string }[] | null
  createdAt: string
}
