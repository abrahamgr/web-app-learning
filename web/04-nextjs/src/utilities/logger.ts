import pino, { type DestinationStream, type LoggerOptions } from 'pino'
import pretty from 'pino-pretty'
import 'server-only'

type PinoParams = LoggerOptions | DestinationStream

const prodPinoOptions: PinoParams = {}
const devPinoOptions: PinoParams = pretty({ colorize: true })

export const logger = pino(
  (process.env.NODE_ENV as string) === 'production'
    ? prodPinoOptions
    : devPinoOptions,
)
