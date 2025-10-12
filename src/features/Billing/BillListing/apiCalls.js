import { apiCallWrapper } from "@/shared/apiCall/apiCallWrapper";
import axios from "axios";

export const fetchBills_api = async () =>
  apiCallWrapper(async () => {
    const res = await axios.get("/api/bills");
    return res.data;
  });
