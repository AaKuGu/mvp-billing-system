import { apiCallWrapper } from "@/shared/apiCall/apiCallWrapper";
import axios from "axios";

export const finalizeBill_apiCall = (data) =>
  apiCallWrapper(async () => {
    const res = await axios.post("/api/bills", data);
    return res.data;
  });
