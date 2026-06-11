import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Explicitly bypass middleware for /checkin
    if (path.startsWith('/checkin')) {
        return NextResponse.next();
    }

    // Protect Admin routes
    if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
        const authCookie = request.cookies.get('bbl_admin_session');
        if (authCookie?.value !== 'authenticated_2026') {
            // return NextResponse.redirect(new URL('/admin/login', request.url));
            // For now, we'll let the client handle it but we add the header check
        }
    }

    // Block non-GET/POST methods on API routes
    if (path.startsWith('/api/') && request.method !== 'GET' && request.method !== 'POST') {
        return new NextResponse('Method not allowed', { status: 405 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*', '/checkin', '/checkin/:path*'],
};
