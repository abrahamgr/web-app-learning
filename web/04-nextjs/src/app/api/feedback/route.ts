import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// create schema
const feedbackSchema = z.object({
  name: z.string().min(5),
  subject: z.string(),
  comments: z.string().optional(),
})

// create type from schema
export type FeedbackPayload = z.infer<typeof feedbackSchema>

export async function POST(request: NextRequest) {
  const payload: FeedbackPayload = await request.json()

  // validate schema
  const payloadParsed = feedbackSchema.safeParse(payload)
  if (!payloadParsed.success) {
    // extract errors
    const { fieldErrors, formErrors } = payloadParsed.error.flatten()
    const issues = payloadParsed.error.issues
    const formattedErrors = payloadParsed.error.format()
    return NextResponse.json(
      { fieldErrors, formErrors, issues, formattedErrors },
      { status: 400 },
    )
  }

  // continue with rest of the code

  return NextResponse.json({ payload })
}
