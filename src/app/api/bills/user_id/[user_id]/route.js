import Bill from "@/models/Bill";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";

export const GET = controllerFunc(async (req, params) => {
  await dbConnect();

  const { user_id } = params;

  console.log("user_id : ", user_id);

  const bills = await Bill.find().sort({ createdAt: -1 }).limit(10);
  return successResponse({ bills }, "Bills fetched successfully");
}, "Error in GET /bills");
