import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const badHeader = request.headers.get('x-bad-header')
  console.log(`${red('x-bad-header')} ${cyan(badHeader)}`, request.url)
  if (badHeader) return NextResponse.redirect(new URL('/unauthorized', request.url))
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!unauthorized).*)'
}

const red = (text?: any) => `\x1b[31m${text}\x1b[0m`
const cyan = (text?: any) => `\x1b[36m${text}\x1b[0m`
