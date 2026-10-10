import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

// Optimistic gate only: it checks that a session cookie exists. The protected
// layout still validates the session against the API.
export function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/data/:path*",
    "/settings/:path*",
    "/components/:path*",
  ],
}
