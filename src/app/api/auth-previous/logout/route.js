// app/api/logout/route.js
import { dbConnect } from "@/db/connectDB";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import { NextResponse } from "next/server";

export const POST = controllerFunc(async () => {
  await dbConnect();
  const errorContext = `Error in POST /api/logout`;

  // ✅ Clear the auth_token cookie
  const res = NextResponse.json(
    { success: true, message: "Logout successful" },
    { status: 200 }
  );

  res.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0), // expire immediately
    path: "/",
  });

  return res;
}, "Error in POST /api/logout");
