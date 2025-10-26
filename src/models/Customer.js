import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional, reference to the User model
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
      trim: true,
    },
    whatsapp_num: {
      type: String,
      match: [/^\d{10,15}$/, "Invalid WhatsApp number"], // basic validation
    },
    customer_address_area: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// ✅ Allow same number for different users
CustomerSchema.index({ user_id: 1, whatsapp_num: 1 }, { unique: true });

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);
