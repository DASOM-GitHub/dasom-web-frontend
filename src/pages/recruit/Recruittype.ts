export interface RecruitFormData {
  name: string
  studentNo: string
  contact: string
  email: string
  grade: number
  reasonForApply: string
  activityWish: string
  isMessageAgreed: boolean
  isPrivacyPolicyAgreed: boolean
  isFirstRoundPassed?: boolean
  isSecondRoundPassed?: boolean
  isOverwriteConfirmed?: boolean
}

export interface RecruitConfigItem {
  key: string
  value: string
}

export interface RecruitInterviewData {
  documentPassAnnouncement: string
  interviewPeriodStart: string
  interviewPeriodEnd: string
}

export interface InterviewPeriod {
  periodStart: string
  periodEnd: string
}

export interface InterviewTime {
  timeStart: string
  timeEnd: string
}

export interface InterviewSlot {
  id: number
  interviewDate: string
  startTime: string
}

export type PassType = 'INTERVIEW_PASS' | 'DOCUMENT_PASS'

export interface RecruitResultResponse {
  name: string
  isPassed: boolean
}

export interface RecruitCheckState {
  name: string
  isPassed: boolean
  studentNo: string
  contactLastDigit: string
}

export interface RecruitCheckFinalState {
  name: string
  isPassed: boolean
}

export interface RecruitSubmitMeetingState {
  date: string
  time: string
}

export interface SomkathonRecruitFormData {
  participantName: string
  studentId: string
  department: string
  grade: string
  contact: string
  email: string
}

export interface RecruitPeriodData {
  recruitmentPeriodStart: string
  recruitmentPeriodEnd: string
  interviewPeriodStart: string
  interviewPeriodEnd: string
  interviewPassAnnouncement: string
}

export interface RecruitScheduleData {
  recruitmentPeriodStart: string // YYYY-MM-DD
  recruitmentPeriodEnd: string // YYYY-MM-DD
  documentPassAnnouncement: string // YYYY-MM-DD
  interviewPeriodStart: string // YYYY-MM-DD
  interviewPeriodEnd: string // YYYY-MM-DD
  interviewTimeStart: string // HH:MM:SS
  interviewTimeEnd: string // HH:MM:SS
  interviewPassAnnouncement: string // YYYY-MM-DD
}