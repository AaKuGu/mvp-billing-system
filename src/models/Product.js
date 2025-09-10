import mongoose from "mongoose";

const PricePointSchema = new mongoose.Schema({
  unit: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    cost: [PricePointSchema], // e.g. [{ unit: "pcs", price: 8 }]
    wholesale: [PricePointSchema], // e.g. [{ unit: "pcs", price: 9 }, { unit: "dozen", price: 105 }]
    retail: [PricePointSchema], // e.g. [{ unit: "pcs", price: 10 }]
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
