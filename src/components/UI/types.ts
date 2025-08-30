import { FormFieldProps } from '../../types/forms'
import { Dispatch, SetStateAction } from 'react'

export interface RecruitHeaderProps {
  title: string
}

export interface ButtonProps {
  text: string
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}

export interface InputFieldProps extends FormFieldProps {
  placeholder?: string
  minLength?: number
  maxLength?: number
  highlightLabels?: string[]
  subLabel?: string
  checkboxLabel?: string
  phoneNumber?: boolean
  checked?: boolean
  onKeyDown?: (
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void
}

export interface TextEditorProps {
  title: string
  content: string
  setTitle: Dispatch<SetStateAction<string>>
  setContent: Dispatch<SetStateAction<string>>
}

export interface FAQItemProps {
  question: string
  answer: string
  alignment: string
}

export interface FileUploadProps {
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  setPage: Dispatch<SetStateAction<number>>
}

export interface AdminApplicantButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export interface Recruit_InfoBannerProps {
  message: string
}

export interface NewsProps {
  id: number
  title: string
  image?: string | null
  images?: { encodedData: string; fileFormat: string }[] | null
  content?: string
  createdAt: string
  onClick: () => void
  isDetail?: boolean
}

export interface NewsCarouselProps {
  imageUrls: string[]
}

// ActivityStatus 관련 타입들
export type ActivityItem = {
  title?: string
  award?: string
  subtitle?: string
}

export type ActivitySection = {
  category: string
  items: ActivityItem[]
}

export interface ActivityStatusProps {
  year: string
  activityData?: ActivitySection[]
  className?: string
}
