// app/api/logs/route.js (Next.js App Router)
import { dbConnect } from "@/db/connectDB";
import System_logs from "@/models/System_logs";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import successResponse from "@/re_usables/backend/utils/success/successResponse";

// GET - Fetch logs (default filter: today)
export const GET = controllerFunc(async (req) => {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const parameter = searchParams.get("parameter");

  const now = new Date();
  const fromDate = new Date();
  fromDate.setHours(0, 0, 0, 0); // start of today

  const logs = await System_logs.find({
    createdAt: { $gte: fromDate, $lte: now },
  }).sort({ createdAt: -1 });

  console.log(logs);

  return successResponse({ logs }, "Logs fetched successfully");
}, "Error in GET /logs");
