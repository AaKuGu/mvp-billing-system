import { dbConnect } from "@/db/connectDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// POST - Add a product
export async function POST(req) {
  try {
    await dbConnect(); // connect to DB

    const body = await req.json(); // parse request body
    const { productName, costPrice, wholesalePrice, retailPrice, pricePoints } =
      body;

    // Basic validation
    if (!productName || !costPrice || !wholesalePrice || !retailPrice) {
      return NextResponse.json(
        { success: false, message: "All main fields are required" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      productName,
      costPrice,
      wholesalePrice,
      retailPrice,
      pricePoints,
    });

    return NextResponse.json(
      { success: true, product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// GET - Fetch all products
export async function GET() {
  try {
    await dbConnect(); // connect to DB

    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
