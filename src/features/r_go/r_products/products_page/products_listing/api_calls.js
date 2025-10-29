import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const delete_a_product_api_call = (id) =>
  apiCallWrapper(
    async () => {
      const res = await axios.delete(`/api/products/${id}`);
      return res?.data;
    },
    `r_go/r_products/products_page/products_listing`,
    { should_hide_loading: true, loading_message: "Deleting Product..." }
  );
