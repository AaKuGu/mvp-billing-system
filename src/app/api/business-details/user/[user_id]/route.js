import { dbConnect } from "@/db/connectDB";
import { BusinessDetails } from "@/models/BusinessDetails";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import CustomError from "@/re_usables/backend/utils/error/CustomError";
import successResponse from "@/re_usables/backend/utils/success/successResponse";

export const GET = controllerFunc(async (req, { params }) => {
  await dbConnect();
  const errorContext = `Error in GET /businessDetails`;
  const { user_id } = params;

  if (!user_id) {
    throw new CustomError("User id is required", 400, errorContext);
  }

  const businessDetails = await BusinessDetails.findOne({ user_id });

  console.log("businessDetails : ", businessDetails);

  return successResponse({ businessDetails }, "Business Details Fetched", 200);
}, "Error in GET /businessDetails");
