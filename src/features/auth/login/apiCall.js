import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const loginAUser_api = (data) =>
  apiCallWrapper(async () => {
    const res = await axios.post(`/api/auth/login`, data, {
      validateStatus: () => true,
    });
    console.log("login a user api : res : ", res);
    return res.data;
  }, `apiCall features/auth/login`);
  