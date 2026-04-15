import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect all /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin_session');
    
    if (!adminSession || adminSession.value !== 'true') {
      // Not logged in, redirect to home with a query parameter to open the modal
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.searchParams.set('admin_login', 'true');
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
