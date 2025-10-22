import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const fetchAProduct_api = (productId) =>
  apiCallWrapper(async () => {
    const res = await axios.get(`/api/products/${productId}`);
    return res.data; // no need for await on .data
  }, "fetchAProduct");
