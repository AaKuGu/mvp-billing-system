"use server";

import Bill from "@/models/Bill";
import { user_list_fetcher } from "@/re_usables/backend/utils/common_queries/user_list_fetcher";

//defaults are like limit = 10, sorted in ascending, userid verified etc
export const fetch_bills_action = user_list_fetcher(Bill, {
  errorMessage: "Error Fetching Bill",
});
