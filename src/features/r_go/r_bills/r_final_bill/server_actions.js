import Bill from "@/models/Bill";
import { user_one_doc_fetcher } from "@/re_usables/backend/utils/common_queries/user_one_doc_fetcher";

export const get_bill_detials_sa = user_one_doc_fetcher(Bill, {
  errorMessage: "Bill not found",
  successMessage: "Bill fetched",
});
