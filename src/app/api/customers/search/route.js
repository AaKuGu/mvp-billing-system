import { dbConnect } from "@/db/connectDB";
import Customer from "@/models/Customer";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import { find_user_docs_query } from "@/re_usables/backend/utils/queries";
import CustomError from "@/re_usables/backend/utils/error/CustomError";
import successResponse from "@/re_usables/backend/utils/success/successResponse";

export const GET = controllerFunc(async (req) => {
  // return successResponse({ customers: [] }, "Search results fetched");

  const { searchParams } = new URL(req.url);
  const search_term = searchParams.get("term");
  const search_value = searchParams.get("value");

  console.log("search term and value : ", search_term);
  console.log("search term and value : ", search_value);

  const error_context = `Error GET /customers/search`;

  if (!search_term || !search_value) {
    throw new CustomError(
      "Search term and value are required",
      400,
      error_context
    );
  }

  // Security whitelist ✅ (so user can't search any field they want)
  const allowedFields = [
    "customer_name",
    "whatsapp_num",
    "customer_address_area",
  ];

  if (!allowedFields.includes(search_term)) {
    throw new CustomError("Invalid search field", 400, error_context);
  }

  // Build dynamic filter
  const filter = { [search_term]: { $regex: search_value, $options: "i" } };

  // return successResponse({ customers: [] }, "Search results fetched");

  const customers = await find_user_docs_query(Customer, {
    user_id: req.context.user_id,
    filter,
    sort: { createdAt: -1 },
    limit: 20, // return top 20 matches
  });

  return successResponse({ customers }, "Search results fetched");
});
