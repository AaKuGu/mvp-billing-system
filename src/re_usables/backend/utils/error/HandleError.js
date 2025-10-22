// utils/handleError.js
import { NextResponse } from "next/server";
import CustomError from "./CustomError";

const handleError = (error, defaultContext = "Unexpected Error") => {
  console.error(`[${defaultContext}]`, error);

  const statusCode = error instanceof CustomError ? error.statusCode : 500;
  const message = error.message || "Internal Server Error";
  const context = error.context || defaultContext;

  return NextResponse.json(
    {
      success: false,
      message,
      context, // 👈 include context in response
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    },
    { status: statusCode }
  );
};

export default handleError;
