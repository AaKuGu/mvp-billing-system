import { dbConnect } from "@/db/connectDB";
import Product from "@/models/Product";
import { controllerFunc } from "@/shared/backend/utils/ControllerFunc";
import CustomError from "@/shared/backend/utils/error/CustomError";
import successResponse from "@/shared/backend/utils/success/successResponse";

export const POST = controllerFunc(async (req) => {
  await dbConnect(); // connect to DB

  let errorContext = "Error in POST /products";

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
    throw new CustomError(
      "Product name, cost, wholesale, and retail are required",
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
  });

  return successResponse({}, "Product Created Successfully", 201);
}, "Error in POST /products");

// GET - Fetch all products
export const GET = controllerFunc(async (req) => {
  await dbConnect(); // connect to DB

  const { searchParams } = new URL(req.url);
  const productName = searchParams.get("productName"); // from query param
  console.log("productName : ", productName);

  let query = {};

  if (productName) {
    // ✅ partial & case-insensitive match on English name
    query = {
      productName: {
        $elemMatch: {
          lang: "eng",
          value: { $regex: productName, $options: "i" }, // <-- regex
        },
      },
    };
  }

  console.log(query);

  const products = await Product.find(query).sort({ createdAt: -1 }).limit(10);

  return successResponse({ products }, "Products Fetched Successfully");
}, "Error in GET /products");
