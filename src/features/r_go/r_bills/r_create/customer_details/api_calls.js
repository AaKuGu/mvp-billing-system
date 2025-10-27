import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const customer_suggestions_api_call = (user_id, customer_name) =>
  apiCallWrapper(async () => {
    const res = await axios.post(`/api/customers/user/${user_id}`, {
      search_term: "customer_name",
      search_value: customer_name,
    });
    return res?.data;
  }, "Error in /r_go/r_bills/r_create/customer_details");
