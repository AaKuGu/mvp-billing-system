import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const saveAProductStock = async (product) =>
  apiCallWrapper(
    async () => {
      const res = await axios.post(`/api/products`, { product });
      // alert("res : " + JSON.stringify(res));
      return res.data;
    },
    "saveAProductStock",
    { should_hide_loading: true, loading_message: `Saving Product...` }
  );
