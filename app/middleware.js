import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    console.log(`Middleware triggered for path: ${pathname}`);

    // Redirect from root path to /en
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/en', request.url));
    }

    // Allow other requests to proceed
    return NextResponse.next();
}
