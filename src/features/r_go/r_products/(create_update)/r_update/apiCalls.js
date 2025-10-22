import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const updateAProduct_api = (productId, data) =>
  apiCallWrapper(async () => {
    const res = await axios.put(`/api/products/${productId}`, data);
    return res.data;
  }, "updateAProduct");
