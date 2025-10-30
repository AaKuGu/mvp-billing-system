// middleware.js
import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ✅ Skip auth routes inside /api/auth/*
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("session cookie : middleware.js : ", sessionCookie);

  return NextResponse.next();
}

export const config = {
  matcher: ["/go/:path*", "/go", "/api/:path*"],
};
