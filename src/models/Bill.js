import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    stringifiedBill: {
      type: String,
      required: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references your BetterAuth user collection
      required: true,
    },

    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // references your Customer collection
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Bill || mongoose.model("Bill", billSchema);
