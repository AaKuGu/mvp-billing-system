import { dbConnect } from "@/db/connectDB";
import { controllerFunc } from "@/shared/backend/utils/ControllerFunc";
import CustomError from "@/shared/backend/utils/error/CustomError";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = controllerFunc(async (req) => {
  await dbConnect();
  const errorContext = `Error in POST /api/login`;
  const body = await req.json();
  const { email, password } = body;

  if (email === "prathamtogupta11@gmail.com") {
    if (password === process.env.ownerPassword) {
      // ✅ JWT sign
      const token = jwt.sign(
        { email, role: "owner" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } // 1 week expiry
      );

      // ✅ Set httpOnly cookie
      const res = NextResponse.json(
        { success: true, message: "Login successful" },
        { status: 200 }
      );

      res.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only https in production
        sameSite: "lax", // since frontend + backend same Next.js
        maxAge: 7 * 24 * 60 * 60, // 1 week
        path: "/", // accessible everywhere
      });

      return res;
    } else {
      throw new CustomError(`Invalid Password`, 401, errorContext);
    }
  }
  throw new CustomError(`Invalid Email`, 401, errorContext);
}, "Error in POST /api/login");
