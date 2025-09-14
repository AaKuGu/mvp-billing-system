import mongoose from "mongoose";

const systemLogsSchema = new mongoose.Schema({
  operationType: {
    type: String,
    enum: ["product_created", "product_updated", "product_deleted"], // ✅ enum values
    required: true,
  },
  payload: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "2d", // ⏰ auto-delete after 1 day
  },
});

export default mongoose.models.System_logs ||
  mongoose.model("System_logs", systemLogsSchema);
