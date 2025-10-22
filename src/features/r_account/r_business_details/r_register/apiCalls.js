import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const register_business_api_call = (data) =>
  apiCallWrapper(async () => {
    const res = await axios.post(`/api/business-details`, data);
    console.log("register_business_api_call : res?.data : ", res?.data);
    return res.data;
  }, "Error in api-calls.js /features/business-details/business-registration/register");

