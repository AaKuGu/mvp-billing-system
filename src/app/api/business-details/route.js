import { dbConnect } from "@/db/connectDB";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import CustomError from "@/re_usables/backend/utils/error/CustomError";
import successResponse from "@/re_usables/backend/utils/success/successResponse";
import { BusinessDetails } from "@/models/BusinessDetails";
import System_logs from "@/models/System_logs";
import {
  create_user_doc_query,
  find_user_one_doc_query,
} from "@/re_usables/backend/utils/queries";

export const POST = controllerFunc(async (req) => {
  const errorContext = "Error in POST /businessDetails";

  const body = await req.json();

  const {
    businessName,
    businessDescription,
    businessTagline,
    businessEmail,
    businessContactNo,
    businessAddress,
    gstNumber,
  } = body;

  if (!businessName) {
    throw new CustomError("Business name is required", 400, errorContext);
  }
  if (typeof businessName !== "string") {
    throw new CustomError("Business name must be a string", 400, errorContext);
  }

  if (!businessEmail) {
    throw new CustomError("Business email is required", 400, errorContext);
  }
  if (typeof businessEmail !== "string") {
    throw new CustomError("Business email must be a string", 400, errorContext);
  }
  // Optionally, validate email format:
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) {
    throw new CustomError("Invalid email format", 400, errorContext);
  }

  if (!businessContactNo) {
    throw new CustomError(
      "Business contact number is required",
      400,
      errorContext
    );
  }
  if (typeof businessContactNo !== "string") {
    throw new CustomError(
      "Business contact number must be a string",
      400,
      errorContext
    );
  }
  if (!/^\+?\d{10,15}$/.test(businessContactNo)) {
    throw new CustomError("Invalid contact number format", 400, errorContext);
  }

  let user_id = req.context.user_id;

  const existing = await find_user_one_doc_query(BusinessDetails, {
    user_id,
  });

  console.log("Existing business details check:", existing);

  if (existing) {
    throw new CustomError(
      "Business details for this user already exist",
      409,
      errorContext
    );
  }

  const data_to_add = {
    businessName,
    businessDescription,
    businessTagline,
    businessEmail,
    businessContactNo,
    businessAddress,
    gstNumber,
  };

  const businessDetails = await create_user_doc_query(BusinessDetails, {
    user_id,
    data: data_to_add,
  });

  return successResponse(
    { businessDetails },
    "Business details created successfully",
    201
  );
}, "Error in POST /businessDetails");
