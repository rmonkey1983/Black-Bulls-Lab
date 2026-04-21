import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Block non-GET/POST methods on API routes
    if (path.startsWith('/api/') && request.method !== 'GET' && request.method !== 'POST') {
        return new NextResponse('Method not allowed', { status: 405 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
};
