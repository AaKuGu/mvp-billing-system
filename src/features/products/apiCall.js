import { apiCallWrapper } from "@/shared/apiCall/apiCallWrapper";
import axios from "axios";

export const fetchAllProducts = (searchTerm, onlyNames) =>
  apiCallWrapper(async () => {
    let res;
    if (searchTerm) {
      if (onlyNames) {
        res = await axios.get(
          `/api/products?productName=${searchTerm}&onlyNames=true`
        );
      } else {
        res = await axios.get(`/api/products?productName=${searchTerm}`);
      }
    } else {
      res = await axios.get(`/api/products`);
    }
    console.log("ores : ", res);
    return res.data;
  }, "features/products/productsListing/fetchAllProducts");
