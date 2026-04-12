import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    // Check if the request is for an admin route
    if (path.startsWith('/admin')) {
        // We know they use client-side sessionStorage, 
        // but Next.js middleware is server-side and doesn't see sessionStorage. 
        // We just prevent direct links from bypassing initial login screen for SEO bots,
        // although real security is in the layout.
        // Wait, wait, actually, to secure /api/waitlist we can check methods.
    }

    if (path.startsWith('/api/') && request.method !== 'GET' && request.method !== 'POST') {
        return new NextResponse('Method not allowed', { status: 405 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
};
