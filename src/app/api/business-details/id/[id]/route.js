import { dbConnect } from "@/db/connectDB";
import { BusinessDetails } from "@/models/BusinessDetails";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import CustomError from "@/re_usables/backend/utils/error/CustomError";
import successResponse from "@/re_usables/backend/utils/success/successResponse";
import mongoose from "mongoose";

export const PUT = controllerFunc(async (req, { params }) => {
  await dbConnect();
  const errorContext = `Error in PUT /business-details/:id`;
  const { id } = params;

  // ✅ Validate ObjectId
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError(
      "Invalid or missing business document ID",
      400,
      errorContext
    );
  }

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

  // ✅ Require key fields
  if (
    !businessName ||
    !businessEmail ||
    !businessContactNo ||
    typeof businessName !== "string" ||
    typeof businessEmail !== "string" ||
    typeof businessContactNo !== "string"
  ) {
    throw new CustomError(
      "Missing or invalid fields: businessName, businessEmail, and businessContactNo are required.",
      400,
      errorContext
    );
  }

  const updatedBusiness = await BusinessDetails.findByIdAndUpdate(
    id,
    {
      businessName,
      businessDescription,
      businessTagline,
      businessEmail,
      businessContactNo,
      businessAddress,
      gstNumber,
    },
    {
      new: true,
      overwrite: true, // full document replacement
    }
  );

  if (!updatedBusiness) {
    throw new CustomError("Business not found", 404, errorContext);
  }

  return successResponse(
    { businessDetails: updatedBusiness },
    "Business Details Updated Successfully",
    200
  );
}, "Error in PUT /business-details/:id");
