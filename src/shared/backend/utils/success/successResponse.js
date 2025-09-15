// utils/handleSuccess.js
import { NextResponse } from "next/server";

export default function successResponse(
  data = {},
  message = "Success",
  status = 200
) {
  return NextResponse.json(
    {
      success: true,
      message,
      ...data,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, s-maxage=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}
