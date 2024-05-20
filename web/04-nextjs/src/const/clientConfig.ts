export const isProd = (process.env.NODE_ENV as string) === 'production'

interface ClientConfig {
  apiHost: string
}

export const clientConfig: ClientConfig = {
  apiHost: process.env.NEXT_PUBLIC_API_HOST as string,
}
