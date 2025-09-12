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

// PUT - One-time migration to update productName from string → array
export async function PUT() {
  try {
    await dbConnect();

    // Find products where productName is still a string
    const products = await Product.find({ productName: { $type: "string" } });

    if (!products.length) {
      return NextResponse.json(
        { success: true, message: "No products need migration" },
        { status: 200 }
      );
    }

    // Update each product
    const bulkOps = products.map((p) => ({
      updateOne: {
        filter: { _id: p._id },
        update: {
          $set: {
            productName: [
              { lang: "eng", value: p.productName },
              { lang: "hi", value: "" }, // leave Hindi blank initially
            ],
          },
        },
      },
    }));

    await Product.bulkWrite(bulkOps);

    return NextResponse.json(
      {
        success: true,
        message: `✅ Migrated ${products.length} products successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error migrating product names:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
