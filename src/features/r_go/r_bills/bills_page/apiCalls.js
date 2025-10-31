//not using currently

import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const fetchBills_api = async () =>
  apiCallWrapper(
    async () => {
      const res = await axios.get("/api/bills");
      return res.data;
    },
    `r_go/r_bills/bills_page`,
    { should_hide_loading: true, loading_message: `Fetching Bills...` }
  );
