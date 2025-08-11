import apiClient from '../../utils/apiClient'
import {
  AdminNewsDetail,
  AdminNewsItem,
  ApplicantDetail,
  ApplicantListItem,
  ApplicantListResponse,
  IntervieweeItem,
  SomkathonApplicantDetail,
  SomkathonApplicantListItem,
} from './admin'

// Applicants
export async function listApplicants(
  page: number
): Promise<ApplicantListResponse<ApplicantListItem>> {
  const res = await apiClient.get('/admin/applicants', { params: { page } })
  return res.data
}

export async function getApplicantDetail(id: number): Promise<ApplicantDetail> {
  const res = await apiClient.get(`/admin/applicants/${id}`)
  return res.data
}

export async function updateApplicantStatus(
  id: number,
  status: string
): Promise<void> {
  await apiClient.patch(`/admin/applicants/${id}/status`, { status })
}

// Interviewees
export async function getInterviewees(): Promise<IntervieweeItem[]> {
  const res = await apiClient.get<IntervieweeItem[]>(
    '/recruit/interview/applicants'
  )
  return res.data
}

// News
export async function getNewsList(): Promise<AdminNewsItem[]> {
  const res = await apiClient.get('/news')
  const data = res.data as AdminNewsItem[]
  return data.sort((a, b) => b.id - a.id)
}

export async function getNewsDetail(id: string): Promise<AdminNewsDetail> {
  const res = await apiClient.get(`/news/${id}`)
  return res.data
}

export async function createNews(
  title: string,
  contentHtml: string
): Promise<number> {
  const res = await apiClient.post('/news', { title, content: contentHtml })
  return res.data.id
}

export async function updateNews(
  id: string,
  payload: { title: string; content: string; deleteImageIds: number[] }
): Promise<{ id: number }> {
  const res = await apiClient.put(`/news/${id}`, payload)
  return res.data
}

export async function deleteNews(id: string): Promise<void> {
  await apiClient.delete(`/news/${id}`)
}

export async function uploadNewsFiles(
  targetId: number,
  files: File[]
): Promise<void> {
  if (!files.length) return
  const formData = new FormData()
  files.forEach(file => formData.append('files', file))
  formData.append('fileType', 'NEWS')
  formData.append('targetId', String(targetId))
  await apiClient.post('/files/upload', formData)
}

// Recruit schedule
export interface RecruitKeyValue {
  key: string
  value: string
}

export async function getRecruitSchedule(): Promise<RecruitKeyValue[]> {
  const res = await apiClient.get('/recruit')
  return res.data
}

export async function updateRecruitKeyValue(
  payload: RecruitKeyValue
): Promise<void> {
  await apiClient.patch('/admin/recruit/schedule', payload)
}

export async function createInterviewSchedule(payload: {
  startDate: string
  endDate: string
  startTime: string
  endTime: string
}): Promise<void> {
  await apiClient.post('/recruit/interview/schedule', payload)
}

// Somkathon
export async function listSomkathonParticipants(): Promise<
  SomkathonApplicantListItem[]
> {
  const res = await apiClient.get('/somkathon/participants')
  return res.data
}

export async function getSomkathonParticipant(
  id: number
): Promise<SomkathonApplicantDetail> {
  const res = await apiClient.get(`/somkathon/participants/${id}`)
  return res.data
}

export async function deleteSomkathonParticipant(id: number): Promise<void> {
  await apiClient.delete(`/somkathon/participants/${id}`)
}

// Auth
export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout', {})
}
