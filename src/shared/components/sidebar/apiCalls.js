import { apiCallWrapper } from "@/shared/apiCall/apiCallWrapper";
import axios from "axios";

export const logout_api = () =>
  apiCallWrapper(async () => {
    const res = await axios.post(`/api/auth/logout`);
    return res.data;
  }, "logout_api /shared/components/sidebar/apiCalls");
