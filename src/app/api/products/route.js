import Product from "@/models/Product";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import CustomError from "@/re_usables/backend/utils/error/CustomError";
import successResponse from "@/re_usables/backend/utils/success/successResponse";
import {
  finalProductsToSend,
  queryToSearch,
  validateProductInput,
} from "./funcs";
import System_logs from "@/models/System_logs";
import {
  create_user_doc,
  find_user_docs,
  find_user_one_doc,
} from "@/re_usables/backend/utils/queries";

export const POST = controllerFunc(async (req) => {
  const errorContext = "Error in POST /products";
  const body = await req.json();
  const { product } = body;

  console.log("post is working and body data is : ", body);

  const { productName, units } = validateProductInput(product, errorContext);

  const new_product = await create_user_doc(Product, {
    user_id: req.user_id,
    data: { productName, units },
  });

  return successResponse(
    { newProduct: new_product },
    "Stock Added Successfully!",
    201
  );
}, "Error in POST /products");

// GET - Fetch all products
export const GET = controllerFunc(async (req) => {
  const user_id = req.user_id;

  const products = await find_user_docs(Product, {
    user_id,
    sort: { createdAt: -1 },
    limit: 10,
  });

  console.log("pp : ", products);

  return successResponse({ products }, "Products Fetched Successfully");
}, "Error in GET /products");
