import { dbConnect } from "@/db/connectDB";
import Product from "@/models/Product";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";

export const GET = controllerFunc(async (req, { params }) => {
  await dbConnect();

  let errorContext = "Error in GET /products/[user_id]";

  const { user_id } = params;

  const products = await Product.find({ user_id });

  // console.log(product);

  if (!product) {
    throw new CustomError("User not found", 404, errorContext);
  }

  return successResponse({ products }, "Products fetched", 200);
}, "Error in GET /products/[user_id]");
