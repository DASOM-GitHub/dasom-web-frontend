import apiClient from '../../utils/apiClient'
import {
  RecruitFormData,
  RecruitConfigItem,
  SomkathonRecruitFormData,
} from './Recruittype'

export const fetchRecruitConfigs = async (): Promise<RecruitConfigItem[]> => {
  const { data } = await apiClient.get<RecruitConfigItem[]>('/recruit')
  return data
}

export const fetchIsRecruiting = async (): Promise<boolean> => {
  const data = await fetchRecruitConfigs()
  const recruitmentStart = data.find(
    item => item.key === 'RECRUITMENT_PERIOD_START'
  )?.value
  const recruitmentEnd = data.find(
    item => item.key === 'RECRUITMENT_PERIOD_END'
  )?.value

  if (!recruitmentStart || !recruitmentEnd) return false

  const startDate = new Date(recruitmentStart)
  const endDate = new Date(recruitmentEnd)
  const now = new Date()

  return now >= startDate && now <= endDate
}

export const createRecruitApplication = async (form: RecruitFormData) => {
  return apiClient.post('/recruit/apply', form)
}

export const overwriteRecruitApplication = async (form: RecruitFormData) => {
  const body = { ...form, isOverwriteConfirmed: true }
  return apiClient.post('/recruit/apply', body)
}

export const fetchInterviewSlots = async () => {
  const { data } = await apiClient.get('/recruit/interview/all')
  return data
}

export const submitInterviewReservation = async (
  slotId: number | undefined,
  reservationCode: string | null
) => {
  return apiClient.post('/recruit/interview/reserve', {
    slotId,
    reservationCode,
  })
}

export const fetchRecruitResult = async (
  type: 'INTERVIEW_PASS' | 'DOCUMENT_PASS',
  studentNo: string,
  contactLastDigit: string
) => {
  const { data } = await apiClient.get('/recruit/result', {
    params: { type, studentNo, contactLastDigit },
  })
  return data
}

export const createSomkathonParticipant = async (
  form: SomkathonRecruitFormData
) => {
  return apiClient.post('/somkathon/participants/create', form)
}
