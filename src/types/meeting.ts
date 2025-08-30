export interface TimeSlot {
  id: number
  time: string
  isAvailable: boolean
}

export interface DateSlot {
  date: string
  isSelected: boolean
}

export interface MeetingDateProps {
  date: string
  onClick?: () => void
  isSelected?: boolean
}

export interface MeetingTimeProps {
  time: string
  onClick?: () => void
  isSelected?: boolean
  disabled: boolean
}
