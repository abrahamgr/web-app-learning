import { FeedbackPayload } from '@/app/api/feedback/route'
import { internalEndpoints } from '@/const/endpoints'

export async function sendFeedback(
  payload: FeedbackPayload,
): Promise<FeedbackPayload> {
  const response = await fetch(
    new URL(internalEndpoints.giveFeedback, window.location.origin),
    {
      method: 'post',
      body: JSON.stringify(payload),
    },
  )
  if (!response.ok) throw new Error('Something went wrong')
  const result: FeedbackPayload = await response.json()
  return result
}
