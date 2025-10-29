import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const finalizeBill_apiCall = (data) =>
  apiCallWrapper(
    async () => {
      const res = await axios.post("/api/bills", data);
      return res.data;
    },
    `r_go/r_bills/r_create/Bill summary page/finalised`,
    { should_hide_loading: false, loading_message: `Finalizing Bill...` }
  );
