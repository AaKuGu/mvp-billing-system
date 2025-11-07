import Bill from "@/models/Bill";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import { find_user_one_doc } from "@/re_usables/backend/utils/queries";

export const GET = controllerFunc(async (req, { params }) => {
  console.log("hallo get og");

  const bill = await find_user_one_doc(Bill, {
    user_id: req.context.user_id,
    filter: { _id: params.id },
    populate: "customer",
  });

  console.log("bill data : ", bill);

  return successResponse({ bill }, "Bills fetched successfully");
}, "Error in GET /bills");
