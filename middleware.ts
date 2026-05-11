import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // Apply next-intl middleware for locale handling
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|fr)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
