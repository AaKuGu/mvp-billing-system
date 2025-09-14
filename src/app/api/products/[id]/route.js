import { dbConnect } from "@/db/connectDB";
import Product from "@/models/Product";
import { controllerFunc } from "@/shared/backend/utils/ControllerFunc";
import CustomError from "@/shared/backend/utils/error/CustomError";
import successResponse from "@/shared/backend/utils/success/successResponse";
import { allowedCategories } from "../constant";
import System_logs from "@/models/System_logs";

export const GET = controllerFunc(async (req, { params }) => {
  await dbConnect();

  let errorContext = "Error in GET /products/[id]";

  const { id } = params;

  const product = await Product.findById(id);

  // console.log(product);

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

  const { productName, cost, wholesale, retail, category } = body;

  // ✅ Build update object only with provided fields
  const updateFields = {};
  if (productName !== undefined) updateFields.productName = productName;
  if (typeof category === "string" && allowedCategories.includes(category))
    updateFields.category = category;
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

  System_logs.create({
    operationType: "product_updated",
    payload: JSON.stringify({
      productId: updatedProduct._id,
      productName: updatedProduct.productName,
      category: updatedProduct.category,
      cost: updatedProduct.cost,
      wholesale: updatedProduct.wholesale,
      retail: updatedProduct.retail,
    }),
  });

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

  System_logs.create({
    operationType: "product_deleted",
    payload: JSON.stringify({
      productId: deletedProduct._id,
      productName: deletedProduct.productName,
      category: deletedProduct.category,
      cost: deletedProduct.cost,
      wholesale: deletedProduct.wholesale,
      retail: deletedProduct.retail,
    }),
  });

  return successResponse({}, "Product deleted successfully");
}, "Error in DELETE /products/[id]");
