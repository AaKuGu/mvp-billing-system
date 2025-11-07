import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const update_business_api_call = (id, data) =>
  apiCallWrapper(
    async () => {
      const res = await axios.put(`/api/business-details/${id}`, data);
      console.log("update_business_api_call : res?.data : ", res?.data);
      return res.data;
    },
    "Error in api-calls.js /features/business-details/business-registration/update",
    { loading_message: "Updating business Details..." }
  );
