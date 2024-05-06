import { type HttpHandler } from 'msw'
import { submitFeedbackSuccess } from './feedback'

// handlers only for happy path
export const handlers: HttpHandler[] = [submitFeedbackSuccess]
