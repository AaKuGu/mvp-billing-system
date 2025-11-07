import Product from "@/models/Product";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import successResponse from "@/re_usables/backend/utils/success/successResponse";
import { validateProductInput } from "./funcs";
import {
  create_user_doc_query,
  find_user_docs_query,
} from "@/re_usables/backend/utils/queries";

export const POST = controllerFunc(async (req) => {
  const errorContext = "Error in POST /products";
  const body = await req.json();
  const { product } = body;

  console.log("post is working and body data is : ", body);

  const { productName, units } = validateProductInput(product, errorContext);

  const new_product = await create_user_doc_query(Product, {
    user_id: req.context.user_id,
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
  const user_id = req.context.user_id;

  const products = await find_user_docs_query(Product, {
    user_id,
    sort: { createdAt: -1 },
    limit: 10,
  });

  console.log("pp : ", products);

  return successResponse({ products }, "Products Fetched Successfully");
}, "Error in GET /products");
