import { ChangeEvent } from 'react'

export interface FormFieldProps {
  label: string
  name: string
  value: string | boolean
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox'
  options?: { value: string; label: string }[]
}
