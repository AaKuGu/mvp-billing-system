import { dbConnect } from "@/db/connectDB";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import CustomError from "@/re_usables/backend/utils/error/CustomError";
import successResponse from "@/re_usables/backend/utils/success/successResponse";
import { BusinessDetails } from "@/models/BusinessDetails";
import System_logs from "@/models/System_logs";

export const POST = controllerFunc(async (req) => {
  await dbConnect();

  const errorContext = "Error in POST /businessDetails";

  const body = await req.json();

  const {
    user_id,
    businessName,
    businessDescription,
    businessTagline,
    businessEmail,
    businessContactNo,
    businessAddress,
    gstNumber,
  } = body;

  console.log("user_id : POST /api/business-details/route.js", user_id);

  // ✅ Separate and clear validation
  if (!user_id) {
    throw new CustomError("User ID is required", 400, errorContext);
  }
  if (typeof user_id !== "string") {
    throw new CustomError("User ID must be a string", 400, errorContext);
  }

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

  // Optional: you can add more validations (email format, phone format, GST format) here

  // Check if business details for this user already exist
  const existing = await BusinessDetails.findOne({ user_id });

  if (existing) {
    console.log("business already exists", existing);

    throw new CustomError(
      "Business details for this user already exist",
      409,
      errorContext
    );
  }

  // ✅ Create new business details document
  const businessDetails = await BusinessDetails.create({
    user_id,
    businessName,
    businessDescription,
    businessTagline,
    businessEmail,
    businessContactNo,
    businessAddress,
    gstNumber,
  });

  console.log("businessDetails : ", businessDetails);

  if (businessDetails){
    
  }
    // ✅ Log creation event
    //   await System_logs.create({
    //     operationType: "business_created",
    //     payload: JSON.stringify({
    //       businessId: businessDetails._id,
    //       user_id: businessDetails.user_id,
    //       businessName: businessDetails.businessName,
    //     }),
    //   });

    return successResponse(
      { businessDetails },
      "Business details created successfully",
      201
    );
}, "Error in POST /businessDetails");
