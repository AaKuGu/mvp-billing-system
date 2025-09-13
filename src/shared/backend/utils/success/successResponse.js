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
      ...data, // you can pass { product }, { products }, etc.
    },
    { status }
  );
}
