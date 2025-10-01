import mongoose from "mongoose";

// Unit Schema (for each level of the product)
const unitSchema = new mongoose.Schema({
  level: { type: Number, required: true }, // 1, 2, 3, etc.
  unitName: { type: String, required: true },
  perParentQuantity: { type: Number, default: null }, // null for level 1
  totalQuantity: { type: Number, default: 0 },
  totalCost: { type: Number, default: 0 }, // usually only for level 1
  unitCost: { type: Number, default: 0 }, // cost per unit
  pointer: { type: Number, default: 0 }, // optional, for live calculations
  unitSellingPrice: { type: Number, default: 0 }, // final selling price per unit
  unitSellingPercentage: { type: Number, default: 0 }, // margin %
});

// Product Schema
const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: [true, "Product Name is required"] },
    units: [unitSchema],
  },
  { timestamps: true } // createdAt, updatedAt
);

// Export model
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
