import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const customer_suggestions_api_call = (term, value) =>
  apiCallWrapper(
    async () => {
      const res = await axios.get(
        `/api/customers/search?term=${term}&value=${value}`
      );
      return res?.data;
    },
    "Error in /r_go/r_bills/r_create/customer_details",
    { should_show_loading: false }
  );
