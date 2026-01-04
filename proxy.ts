import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Define paths that don't require authentication
    // We allow /auth (login page), /api/auth (auth endpoints), and static assets
    const isPublicPath =
        pathname.startsWith("/auth") ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/_next") ||
        pathname === "/favicon.ico";

    if (isPublicPath) {
        return NextResponse.next();
    }

    // Check for session token
    // better-auth uses "better-auth.session_token" or "__Secure-better-auth.session_token"
    const sessionToken = request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionToken) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (auth endpoints)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
    ],
};
