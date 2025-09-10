import { dbConnect } from "@/db/connectDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// POST - Add a product
export async function POST(req) {
  try {
    await dbConnect(); // connect to DB

    const body = await req.json(); // parse request body
    const { productName, cost, wholesale, retail } = body;

    // ✅ Basic validation
    if (
      !productName ||
      !Array.isArray(cost) ||
      cost.length === 0 ||
      !Array.isArray(wholesale) ||
      wholesale.length === 0 ||
      !Array.isArray(retail) ||
      retail.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Product name, cost, wholesale, and retail are required",
        },
        { status: 400 }
      );
    }

    // ✅ Create new product
    const newProduct = await Product.create({
      productName,
      cost,
      wholesale,
      retail,
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
