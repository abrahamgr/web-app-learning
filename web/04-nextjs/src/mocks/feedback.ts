import { http, HttpResponse } from 'msw'
import { FeedbackPayload } from '@/app/api/feedback/route'
import { internalEndpoints } from '@/const/endpoints'

export const submitFeedbackSuccess = http.post(
  `*${internalEndpoints.giveFeedback}`,
  () => {
    const payload: FeedbackPayload = {
      name: 'test name',
      subject: 'subject name',
      comments: 'comments name',
    }
    return HttpResponse.json(payload)
  },
)

export const submitFeedbackError = http.post(
  `*${internalEndpoints.giveFeedback}`,
  () => {
    return HttpResponse.json({}, { status: 500 })
  },
)
