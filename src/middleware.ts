import { NextResponse, NextRequest } from 'next/server'
import { getSessionCookie } from "better-auth/cookies";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie && request.nextUrl.pathname!="/") {
		return NextResponse.redirect(new URL("/", request.url));
	}
    if(sessionCookie && request.nextUrl.pathname=="/"){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}