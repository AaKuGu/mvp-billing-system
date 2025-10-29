import { apiCallWrapper } from "@/re_usables/apiCall/apiCallWrapper";
import axios from "axios";

export const fetchSystemLogs_api = (parameter) =>
  apiCallWrapper(
    async () => {
      const res = await axios.get(`/api/system_logs?parameter=${parameter}`);
      return res.data;
    },
    `system_logs`,
    { should_hide_loading: true, loading_message: `Fetching System Logs...` }
  );
