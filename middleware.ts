// COMMENTED OUT FOR NON-AUTH MODE - RESTORE FOR AUTHENTICATION
/*
import { auth } from '@/app/(auth)/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const isAuthPath = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register') ||
                     request.nextUrl.pathname.startsWith('/api/auth');
                     
  // Allow auth-related paths
  if (isAuthPath) {
    // If logged in and trying to access auth pages, redirect to home
    if (isLoggedIn && (request.nextUrl.pathname.startsWith('/login') || 
                       request.nextUrl.pathname.startsWith('/register'))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
  
  // If not logged in and accessing protected routes, redirect to login
  if (!isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    // Preserve the original URL as callback URL
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except for:
    // 1. /api/auth routes
    // 2. /_next (Next.js internals)  
    // 3. /_static (Static files)
    // 4. /favicon.ico, /robots.txt, etc.
    '/((?!_next|_static|favicon.ico|robots.txt).*)',
  ],
};
*/

// NO-AUTH MODE: Allow all requests through without authentication
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RATE_LIMIT = 60; // requests
const INTERVAL = 60 * 1000; // 1 minute

// In-memory map for IP tracking (note: not suitable for production scale)
const ipMap = new Map<string, { count: number; last: number }>();

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Only apply rate limiting to /api/chat endpoints
  if (pathname.startsWith('/api/chat')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const now = Date.now();
    const entry = ipMap.get(ip) || { count: 0, last: now };

    // Reset count if interval has passed
    if (now - entry.last > INTERVAL) {
      entry.count = 0;
      entry.last = now;
    }

    entry.count += 1;
    ipMap.set(ip, entry);

    if (entry.count > RATE_LIMIT) {
      const res = NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      res.headers.set('Retry-After', '60');
      return res;
    }
  }
  return NextResponse.next();
}
