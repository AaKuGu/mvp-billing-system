import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    stringifiedBill: { type: String, required: true },
    user_id: {
      type: String,
      required: true,
      unique: true, // one business per user
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Bill || mongoose.model("Bill", billSchema);
