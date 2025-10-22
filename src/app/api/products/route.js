import { dbConnect } from "@/db/connectDB";
import Product from "@/models/Product";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import CustomError from "@/re_usables/backend/utils/error/CustomError";
import successResponse from "@/re_usables/backend/utils/success/successResponse";
import { finalProductsToSend, queryToSearch } from "./funcs";
import System_logs from "@/models/System_logs";

export const POST = controllerFunc(async (req) => {
  await dbConnect(); // connect to DB

  const errorContext = "Error in POST /products";
  const body = await req.json();
  const { productName, units } = body;

  console.log("post is working and body data is : ", body);

  if (
    !productName ||
    typeof productName !== "string" ||
    productName.trim() === ""
  ) {
    throw new CustomError(
      "Product name is required and must be a string",
      400,
      errorContext
    );
  }

  if (!Array.isArray(units) || units.length === 0) {
    throw new CustomError(
      "Units array is required and cannot be empty",
      400,
      errorContext
    );
  }

  units.forEach((d, i) => {
    let level = i + 1;
    // Level 1 unit (buying unit)
    if (i === 0) {
      if (
        !d.unitName ||
        typeof d.unitName !== "string" ||
        d.unitName.trim() === ""
      ) {
        throw new CustomError(
          `Level 1 unit must have a valid unitName`,
          400,
          errorContext
        );
      }
      if (typeof d.totalQuantity !== "number" || d.totalQuantity <= 0) {
        throw new CustomError(
          `Level 1 unit must have totalQuantity > 0`,
          400,
          errorContext
        );
      }
      if (typeof d.totalCost !== "number" || d.totalCost <= 0) {
        throw new CustomError(
          `Level 1 unit must have totalCost > 0`,
          400,
          errorContext
        );
      }
      if (typeof d.unitCost !== "number" || d.unitCost <= 0) {
        throw new CustomError(
          `Level 1 unit must have unitCost > 0`,
          400,
          errorContext
        );
      }
    } else {
      // Sub-units (level > 1)
      if (
        !d.unitName ||
        typeof d.unitName !== "string" ||
        d.unitName.trim() === ""
      ) {
        throw new CustomError(
          `Sub-unit at level ${level} must have a valid unitName`,
          400,
          errorContext
        );
      }
      if (typeof d.perParentQuantity !== "number" || d.perParentQuantity <= 0) {
        throw new CustomError(
          `Sub-unit at level ${level} must have perParentQuantity > 0`,
          400,
          errorContext
        );
      }
      if (typeof d.totalQuantity !== "number" || d.totalQuantity <= 0) {
        throw new CustomError(
          `Sub-unit at level ${level} must have totalQuantity > 0`,
          400,
          errorContext
        );
      }
      if (typeof d.unitCost !== "number" || d.unitCost <= 0) {
        throw new CustomError(
          `Sub-unit at level ${level} must have unitCost > 0`,
          400,
          errorContext
        );
      }
    }
    // Common fields for all units
    // if (typeof d.unitSellingPrice !== "number" || d.unitSellingPrice < 0) {
    //   throw new CustomError(
    //     `Unit at level ${level} must have valid unitSellingPrice`,
    //     400,
    //     errorContext
    //   );
    // }
    // if (
    //   typeof d.unitSellingPercentage !== "number" ||
    //   d.unitSellingPercentage < 0
    // ) {
    //   throw new CustomError(
    //     `Unit at level ${level} must have valid unitSellingPercentage`,
    //     400,
    //     errorContext
    //   );
    // }
  });

  // validate each unit as before...

  // ✅ Validation

  // ✅ Create new product
  const newProduct = await Product.create({
    productName,
    units,
  });

  System_logs.create({
    operationType: "product_created",
    payload: JSON.stringify({
      productId: newProduct._id,
      productName: newProduct.productName,
      units: newProduct.units,
    }),
  });

  return successResponse({ newProduct }, "Stock Added Successfully!", 201);
}, "Error in POST /products");

// GET - Fetch all products
export const GET = controllerFunc(async (req) => {
  await dbConnect(); // connect to DB

  const { searchParams } = new URL(req.url);
  const productName = searchParams.get("productName"); // from query param
  const onlyNames = searchParams.get("onlyNames"); // from query param

  const query = queryToSearch(productName);

  const products = await finalProductsToSend(Product, query, onlyNames);

  console.log("pp : ", products);

  return successResponse({ products }, "Products Fetched Successfully");
}, "Error in GET /products");
