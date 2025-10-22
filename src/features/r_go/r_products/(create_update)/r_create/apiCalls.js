import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const saveAProductStock = async (data) =>
  apiCallWrapper(async () => {
    const res = await axios.post(`/api/products`, data);
    // alert("res : " + JSON.stringify(res));
    return res.data;
  }, "saveAProductStock");
