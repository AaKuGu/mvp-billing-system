import { fetchSystemLogs_api } from "./apiCall";

export const fetchSystemLogs = async (setLogsList, parameter, setLoading) => {
  const data = await fetchSystemLogs_api(parameter);
  if (data.success) {
    setLogsList(data?.logs);
  }
  setLoading(false);
};
