import { apiCallWrapper } from "@/shared/apiCall/apiCallWrapper";
import axios from "axios";

export const saveAProductStock = async (data) =>
  apiCallWrapper(async () => {
    const res = await axios.post(`/api/products`, data);
    // alert("res : " + JSON.stringify(res));
    return res.data;
  }, "saveAProductStock");

export const updateAProduct_api = (productId, data) =>
  apiCallWrapper(async () => {
    const res = await axios.put(`/api/products/${productId}`, data);
    return res.data;
  }, "updateAProduct");
