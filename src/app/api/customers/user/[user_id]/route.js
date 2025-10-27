import { dbConnect } from "@/db/connectDB";
import Customer from "@/models/Customer";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import CustomError from "@/re_usables/backend/utils/error/CustomError";
import successResponse from "@/re_usables/backend/utils/success/successResponse";

export const POST = controllerFunc(async (req, { params }) => {
  await dbConnect();

  const error_context = `Error in POST /customers/user/[user_id]`;

  const { user_id } = params;
  const { search_term, search_value } = await req.json();

  console.log("user_id : ", user_id);
  console.log("search_term & search_value : ", search_term, search_value);

  // ✅ Basic validation
  if (!user_id || !search_term || !search_value) {
    throw new CustomError(
      "user_id, search_term and search_value are required",
      400,
      error_context
    );
  }

  // ✅ Allow only specific searchable fields to prevent misuse
  const allowedFields = [
    "customer_name",
    "whatsapp_num",
    "customer_address_area",
  ];
  if (!allowedFields.includes(search_term)) {
    throw new CustomError(
      `Invalid search term: ${search_term}`,
      400,
      error_context
    );
  }

  // ✅ Build query dynamically
  const query = {
    user_id,
    [search_term]: { $regex: search_value.trim(), $options: "i" }, // partial + case-insensitive
  };

  // ✅ Fetch matching customers
  const customers = await Customer.find(query)
    .sort({ name: 1 })
    .limit(10)
    .select("customer_name whatsapp_num customer_address_area") // only return needed fields
    .lean();

  console.log("customers : ", customers);

  return successResponse(
    { customers },
    "Customer suggestions fetched successfully"
  );
}, "Error in POST /customers/user/[user_id]");
