import { apiCallWrapper } from "@/shared/apiCall/apiCallWrapper";
import axios from "axios";

export const register_business_api_call = (data) =>
  apiCallWrapper(async () => {
    const res = await axios.post(`/api/business-details`, data);
    console.log("register_business_api_call : res?.data : ", res?.data);
    return res.data;
  }, "Error in api-calls.js /features/business-details/business-registration/register");

export const update_business_api_call = (id, data) =>
  apiCallWrapper(async () => {
    const res = await axios.put(`/api/business-details/id/${id}`, data);
    console.log("update_business_api_call : res?.data : ", res?.data);
    return res.data;
  }, "Error in api-calls.js /features/business-details/business-registration/update");
