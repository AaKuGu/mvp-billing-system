// app/api/logs/route.js (Next.js App Router)
import { dbConnect } from "@/db/connectDB";
import System_logs from "@/models/System_logs";
import { NextResponse } from "next/server";

// POST - Create a log
// export async function POST(req) {
//   try {
//     await dbConnect();

//     const body = await req.json();
//     const { operationType, payload } = body;

//     // ✅ Basic validation
//     if (!operationType) {
//       return NextResponse.json(
//         { success: false, message: "operationType is required" },
//         { status: 400 }
//       );
//     }

//     const newLog = await System_logs.create({
//       operationType,
//       payload: payload ? JSON.stringify(payload) : "",
//     });

//     return NextResponse.json({ success: true, log: newLog }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating log:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// GET - View logs (default filter: today)
export async function GET(req) {
  try {
    await dbConnect();

    const now = new Date();
    const fromDate = new Date();
    fromDate.setHours(0, 0, 0, 0); // start of today

    const logs = await System_logs.find({
      createdAt: { $gte: fromDate, $lte: now },
    }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, logs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
