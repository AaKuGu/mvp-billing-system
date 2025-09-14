import { apiCallWrapper } from "@/shared/apiCall/apiCallWrapper";
import axios from "axios";

export const deleteAProduct = (productId) => {
  apiCallWrapper(async () => {
    const res = await axios.delete(`/api/products/${productId}`);
    return res.data;
  }, "features/products/productsListing/deleteAProduct");
};

export const fetchAllProducts = (searchTerm) =>
  apiCallWrapper(async () => {
    let res;
    if (searchTerm) {
      res = await axios.get(`/api/products?productName=${searchTerm}`);
    } else {
      res = await axios.get(`/api/products`);
    }
    console.log("ores : ", res);
    return res.data;
  }, "features/products/productsListing/fetchAllProducts");
