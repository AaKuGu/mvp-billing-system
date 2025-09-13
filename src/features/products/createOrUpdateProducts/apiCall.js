import { apiCallWrapper } from "@/shared/apiCall/apiCallWrapper";
import axios from "axios";

export const fetchAProduct_api = (productId) =>
  apiCallWrapper(async () => {
    const res = await axios.get(`/api/products/${productId}`);
    return res.data; // no need for await on .data
  }, "fetchAProduct");

export const saveAProduct = (data) =>
  apiCallWrapper(async () => {
    const res = await axios.post(`/api/products`, data);
    return res.data;
  }, "saveAProduct");

export const updateAProduct = (productId, data) =>
  apiCallWrapper(async () => {
    const res = await axios.put(`/api/products/${productId}`, data);
    return res.data;
  }, "updateAProduct");
