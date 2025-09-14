import { dbConnect } from "@/db/connectDB";
import Product from "@/models/Product";
import { controllerFunc } from "@/shared/backend/utils/ControllerFunc";
import CustomError from "@/shared/backend/utils/error/CustomError";
import successResponse from "@/shared/backend/utils/success/successResponse";
import { allowedCategories } from "./constant";
import { finalProductsToSend, queryToSearch } from "./funcs";
import System_logs from "@/models/System_logs";

export const POST = controllerFunc(async (req) => {
  await dbConnect(); // connect to DB

  const errorContext = "Error in POST /products";
  const body = await req.json(); // parse request body
  const { productName, cost, wholesale, retail, category } = body;

  // ✅ Validation
  if (
    !Array.isArray(productName) ||
    productName.length === 0 ||
    !Array.isArray(cost) ||
    cost.length === 0 ||
    !Array.isArray(wholesale) ||
    wholesale.length === 0 ||
    !Array.isArray(retail) ||
    retail.length === 0 ||
    !category ||
    typeof category !== "string" ||
    !allowedCategories.includes(category)
  ) {
    throw new CustomError(
      "Invalid input: productName, cost, wholesale, retail and valid category are required",
      400,
      errorContext
    );
  }

  // ✅ Create new product
  const newProduct = await Product.create({
    productName,
    cost,
    wholesale,
    retail,
    category,
  });

  System_logs.create({
    operationType: "product_created",
    payload: JSON.stringify({
      productId: newProduct._id,
      productName: newProduct.productName,
      category: newProduct.category,
      cost: newProduct.cost,
      wholesale: newProduct.wholesale,
      retail: newProduct.retail,
    }),
  });

  return successResponse({}, "Product Created Successfully", 201);
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
