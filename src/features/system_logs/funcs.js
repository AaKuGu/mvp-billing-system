import { fetchSystemLogs_api } from "./apiCall";

export const fetchSystemLogs = async (setLogsList, setLoading) => {
  const data = await fetchSystemLogs_api();
  if (data.success) {
    setLogsList(data?.logs);
  }
  setLoading(false);
};
