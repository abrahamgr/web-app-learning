interface ClientConfig {
  apiHost: string
}

export const clientConfig: ClientConfig = {
  apiHost: process.env.NEXT_PUBLIC_API_HOST as string,
}
