import { apiCallWrapper } from "@/shared/apiCall/apiCallWrapper";
import axios from "axios";

export const fetchSystemLogs_api = () =>
  apiCallWrapper(async () => {
    const res = await axios.get(`/api/system_logs`, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  });
