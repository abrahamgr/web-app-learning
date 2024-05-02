import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const {
    nextUrl: { searchParams },
  } = request

  // rewrite by params passed
  const rewriteUrl = searchParams.get('rewrite')
  if (rewriteUrl) return NextResponse.rewrite(new URL(rewriteUrl, request.url))

  // set new headers
  const response = NextResponse.next()
  const keysIterator = searchParams.keys()
  let keyItem = keysIterator.next()
  while (!keyItem.done) {
    const { value } = keyItem
    response.headers.set(`X-${value}`, searchParams.get(value) as string)
    keyItem = keysIterator.next()
  }
  return response
}

export const config = {
  matcher: '/info',
}
