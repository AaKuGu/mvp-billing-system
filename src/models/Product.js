import mongoose from "mongoose";

const PricePointSchema = new mongoose.Schema({
  unit: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    costPrice: { type: Number, required: true },
    wholesalePrice: { type: Number, required: true },
    retailPrice: { type: Number, required: true },
    pricePoints: [PricePointSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
