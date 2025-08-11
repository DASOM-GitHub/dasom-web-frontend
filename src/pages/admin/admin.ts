export interface ApplicantListItem {
  id: number
  name: string
  studentNo: string
  status: string
}

export interface ApplicantDetail extends ApplicantListItem {
  contact: string
  email: string
  grade: string
  reasonForApply: string
  activityWish: string
  isPrivacyPolicyAgreed: boolean
  createdAt: string
  updatedAt: string
  [key: string]: any
}

export interface ApplicantListResponse<T = ApplicantListItem> {
  content: T[]
  totalElements: number
  totalPages: number
}

// Admin - Interviewee
export interface IntervieweeItem {
  applicantId: number
  applicantName: string
  studentNo: string
  contact: string
  email: string
  activityWish: string
  reasonForApply: string
  interviewDate: string
  interviewTime: string
  appliedDate: string
}

// Admin - News
export interface AdminNewsImage {
  id: number
  fileFormat: string
  encodedData: string
}

export interface AdminNewsItem {
  id: number
  title: string
  createdAt: string
}

export interface AdminNewsDetail {
  id: number
  title: string
  content: string
  createdAt: string
  images: AdminNewsImage[]
}

// Admin - Somkathon Applicants
export interface SomkathonApplicantListItem {
  id: number
  participantName: string
  studentId: string
}

export interface SomkathonApplicantDetail extends SomkathonApplicantListItem {
  contact: string
  email: string
  grade: string
  department: string
}
