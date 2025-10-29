import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const fetchAllProducts = async (searchTerm, onlyNames) =>
  apiCallWrapper(
    async () => {
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
        // alert("yo");
        res = await axios.get(`/api/products`);
      }
      console.log("ores : ", res);
      return res.data;
    },
    "features/products/productsListing/fetchAllProducts",
    { should_hide_loading: true }
  );
