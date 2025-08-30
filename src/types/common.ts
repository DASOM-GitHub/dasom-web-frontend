import { ReactNode } from 'react'

export interface BaseProps {
  children?: ReactNode
  className?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  code?: string
}
