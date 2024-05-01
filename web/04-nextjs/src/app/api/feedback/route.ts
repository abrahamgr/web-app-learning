import { NextRequest, NextResponse } from 'next/server'

export interface FeedbackPayload {
  name: string
  subject: string
  comments: string
}

export async function POST(request: NextRequest) {
  const payload: FeedbackPayload = await request.json()
  return NextResponse.json({ payload })
}
