"use server";

import Customer from "@/models/Customer";
import { user_list_fetcher } from "@/re_usables/backend/utils/common_queries/user_list_fetcher";

// ✅ Fetch Customers list
export const fetch_customers_list_action = user_list_fetcher(Customer, {
  errorMessage: "No customers found.",
  successMessage: "Fetched Customers List successfully.",
  limit: 10,
  sort: { createdAt: -1 },
});
