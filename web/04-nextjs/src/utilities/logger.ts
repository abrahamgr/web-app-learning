import { isProd } from '@/const/clientConfig'
import pino, { type DestinationStream, type LoggerOptions } from 'pino'
import pretty from 'pino-pretty'
import 'server-only'

type PinoParams = LoggerOptions | DestinationStream

const prodPinoOptions: PinoParams = {}
const devPinoOptions: PinoParams = pretty({ colorize: true })

export const logger = pino(isProd ? prodPinoOptions : devPinoOptions)
