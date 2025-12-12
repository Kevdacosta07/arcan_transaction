import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root to default locale
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/fr';
    return NextResponse.redirect(url);
  }

  // Apply next-intl middleware for locale handling
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|fr)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
