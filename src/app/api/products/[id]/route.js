import Product from "@/models/Product";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import CustomError from "@/re_usables/backend/utils/error/CustomError";
import successResponse from "@/re_usables/backend/utils/success/successResponse";
import {
  delete_user_doc_query,
  find_user_one_doc_query,
  update_user_doc_query,
} from "@/re_usables/backend/utils/queries";

export const GET = controllerFunc(async (req, { params }) => {
  let errorContext = "Error in GET /products/[id]";

  const { id } = params;

  const product = await find_user_one_doc_query(Product, {
    filter: { _id: id },
    user_id: req.context.user_id,
  });

  // console.log(product);

  if (!product) {
    throw new CustomError("Product not found", 404, errorContext);
  }

  return successResponse({ product }, "Product fetched", 200);
}, "Error in GET /products/[id]");

export const PUT = controllerFunc(async (req, { params }) => {
  let errorContext = "Error in PUT /products/[id]";

  const { id } = params;

  console.log("product id in put request : ", id);
  console.log("params in put request : ", params);

  if (!id) {
    throw new CustomError(`Id is required`, 404, errorContext);
  }

  const body = await req.json();

  const { product } = body;

  //check if this can pose any security risk or not , like you are not checking
  //if this product belongs to this user or not

  const { productName, units } = product;

  // const updatedProduct = await Product.findOneAndUpdate(
  //   { _id: id, user_id: req.context.user_id },
  //   { productName, units },
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // ).lean();

  const updated_product = await update_user_doc_query(Product, {
    user_id: req.context.user_id,
    filter: { _id: id },
    update: { productName, units },
  });

  console.log(`updatedProduct: ${updated_product}`);

  if (!updated_product) {
    throw new CustomError("Product not found", 404, errorContext);
  }

  // System_logs.create({
  //   operationType: "product_updated",
  //   payload: JSON.stringify({
  //     productId: updatedProduct._id,
  //     productName: updatedProduct.productName,
  //     units: updatedProduct.units,
  //   }),
  // });

  return successResponse(
    { updatedProduct: updated_product },
    "Product updated successfully",
    200
  );
}, "Error in PUT /products/[id]");

export const DELETE = controllerFunc(async (req, { params }) => {
  let errorContext = "Error in DELETE /products/[id]";

  const { id } = params;

  if (!id) {
    throw new CustomError("Id is required", 400, errorContext);
  }

  const deletedProduct = await delete_user_doc_query(Product, {
    filter: { _id: id },
    user_id: req.context.user_id,
  });

  if (!deletedProduct) {
    throw new CustomError("Product not found", 404, errorContext);
  }

  // System_logs.create({
  //   operationType: "product_deleted",
  //   payload: JSON.stringify({
  //     productId: deletedProduct._id,
  //     productName: deletedProduct.productName,
  //     category: deletedProduct.category,
  //     cost: deletedProduct.cost,
  //     wholesale: deletedProduct.wholesale,
  //     retail: deletedProduct.retail,
  //   }),
  // });

  return successResponse({}, "Product deleted successfully");
}, "Error in DELETE /products/[id]");
