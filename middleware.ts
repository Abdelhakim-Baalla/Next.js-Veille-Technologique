import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Protected routes that require authentication
    const protectedPaths = ['/dashboard/contact']

    const { pathname } = request.nextUrl

    // Check if the current path is protected
    const isProtectedPath = protectedPaths.some(path =>
        pathname.startsWith(path)
    )

    if (isProtectedPath) {
        // Check for session cookie
        const session = request.cookies.get('session')

        if (!session) {
            // Redirect to login if no session
            const loginUrl = new URL('/login', request.url)
            loginUrl.searchParams.set('from', pathname)

            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

// Configure which routes the middleware runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
    ],
}
