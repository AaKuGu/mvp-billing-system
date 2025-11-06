import Bill from "@/models/Bill";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import { find_user_one_doc } from "@/re_usables/backend/utils/queries";

export const GET = controllerFunc(async (req, { params }) => {
  console.log("hallo get og");

  const bill = await find_user_one_doc(Bill, {
    user_id: req.user_id,
    filter: { _id: params.id },
    populate: "customer_id",
  });

  console.log("bill data : ", bill);

  //following is because, customer_id
  // contains the customer details, rather the name should be customer_details, but
  bill.customer_details = bill.customer_id;
  delete bill_data.customer_id;

  return successResponse({ bill }, "Bills fetched successfully");
}, "Error in GET /bills");
