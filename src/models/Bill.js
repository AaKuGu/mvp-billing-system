import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    stringifiedBill: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);  

export default mongoose.models.Bill || mongoose.model("Bill", billSchema);
 