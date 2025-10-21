// // middleware.js
// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export async function middleware(req) {
//   console.log("middleware runs");

//   const { pathname } = req.nextUrl;

//   // ✅ Protected routes
//   const protectedRoutes = ["/go"];

//   if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
//     return NextResponse.next();
//   }

//   const token = req.cookies.get("auth_token")?.value;
//   console.log("token : ", token);

//   if (!token) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   try {
//     // ✅ Verify JWT with jose (Edge runtime safe)
//     await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
//     console.log(`token verified`, token);
//     return NextResponse.next();
//   } catch (err) {
//     console.error("❌ Invalid token:", err.message);
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// // ✅ Matches /go and /go/*
// export const config = {
//   matcher: ["/go", "/go/:path*"],
// };

// middleware.js
import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request) {
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
  matcher: ["/go", "/go/:path*"], // Specify the routes the middleware applies to
};
