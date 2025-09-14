import mongoose from "mongoose";
import { categoryEnum } from "./constant";

const PricePointSchema = new mongoose.Schema({
  unit: { type: String, required: true },
  price: { type: Number, required: true },
});

// New schema for multilingual product name
const LocalizedNameSchema = new mongoose.Schema({
  lang: { type: String, required: true }, // e.g. "en", "hi", "fr"
  value: { type: String, required: true }, // actual name
});

const ProductSchema = new mongoose.Schema(
  {
    productName: [LocalizedNameSchema], // [{ lang: "en", value: "Kaveri" }, { lang: "hi", value: "कावेरी" }]
    cost: [PricePointSchema],
    wholesale: [PricePointSchema],
    retail: [PricePointSchema],
    category: {
      type: String,
      enum: categoryEnum, // ✅ only allow these categories
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
