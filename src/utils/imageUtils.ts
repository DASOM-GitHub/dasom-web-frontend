import { ImageData } from '../pages/news/Newstype'

export function convertToBase64Url(image: ImageData | null): string | null {
  if (!image || !image.encodedData) return null
  return `${image.encodedData}`
}

export function convertMultipleToBase64Urls(
  images: ImageData[] | null
): string[] {
  if (!images || images.length === 0) return []
  return images
    .map(img => convertToBase64Url(img))
    .filter((url): url is string => url !== null)
}
