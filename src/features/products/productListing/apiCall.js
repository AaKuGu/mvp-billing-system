import { apiCallWrapper } from "@/shared/apiCall/apiCallWrapper";
import axios from "axios";

export const deleteAProduct = (productId) => {
  apiCallWrapper(async () => {
    const res = await axios.delete(`/api/products/${productId}`);
    return res.data;
  }, "features/products/productsListing/deleteAProduct");
};

