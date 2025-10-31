import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const updateAProduct_api = (productId, product) =>
  apiCallWrapper(
    async () => {
      const res = await axios.put(`/api/products/${productId}`, {
        product,
      });
      return res.data;
    },
    "updateAProduct",
    { loading_message: `Updating Product...` }
  );
