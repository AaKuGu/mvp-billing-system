import { dbConnect } from "@/db/connectDB";
import Product from "@/models/Product";
import { controllerFunc } from "@/shared/backend/utils/ControllerFunc";
import CustomError from "@/shared/backend/utils/error/CustomError";
import successResponse from "@/shared/backend/utils/success/successResponse";

export const GET = controllerFunc(async (req, { params }) => {
  await dbConnect();

  let errorContext = "Error in GET /products/[id]";

  const { id } = params;

  const product = await Product.findById(id);

  if (!product) {
    throw new CustomError("Product not found", 404, errorContext);
  }

  return successResponse({ product }, "Product fetched", 200);
}, "Error in GET /products/[id]");

export const PUT = controllerFunc(async (req, { params }) => {
  await dbConnect();

  let errorContext = "Error in PUT /products/[id]";

  const { id } = params;
  const body = await req.json();

  const { productName, cost, wholesale, retail } = body;

  // ✅ Build update object only with provided fields
  const updateFields = {};
  if (productName !== undefined) updateFields.productName = productName;
  if (Array.isArray(cost)) updateFields.cost = cost;
  if (Array.isArray(wholesale)) updateFields.wholesale = wholesale;
  if (Array.isArray(retail)) updateFields.retail = retail;

  const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
    new: true,
    runValidators: true,
  });

  console.log(`updatedProduct: ${updatedProduct}`);

  if (!updatedProduct) {
    throw new CustomError("Product not found", 404, errorContext);
  }

  return successResponse(updatedProduct, "Product updated successfully", 200);
}, "Error in PUT /products/[id]");

export const DELETE = controllerFunc(async (req, { params }) => {
  await dbConnect();

  let errorContext = "Error in DELETE /products/[id]";

  const { id } = params;

  if (!id) {
    throw new CustomError("Id is required", 400, errorContext);
  }

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new CustomError("Product not found", 404, errorContext);
  }

  return successResponse({}, "Product deleted successfully");
}, "Error in DELETE /products/[id]");
