import mongoose from "mongoose";

const businessDetailsSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true, // one business per user
    },
    businessName: {
      type: String,
      required: true,
    },
    businessDescription: {
      type: String,
    },
    businessTagline: {
      type: String,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    businessContactNo: {
      type: String,
      required: true,
    },
    businessAddress: {
      type: String,
    },
    gstNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Avoid model overwrite issue in development
export const BusinessDetails =
  mongoose.models.BusinessDetails ||
  mongoose.model("BusinessDetails", businessDetailsSchema);
