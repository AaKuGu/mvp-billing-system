import { dbConnect } from "@/db/connectDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// GET - Fetch a product by ID
export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update product by ID
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await req.json();

    const { productName, costPrice, wholesalePrice, retailPrice, pricePoints } =
      body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        productName,
        costPrice,
        wholesalePrice,
        retailPrice,
        pricePoints,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Remove product by ID
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
