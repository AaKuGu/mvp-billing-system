import { api_call_n_setter } from "@/re_usables/utils/api_call_n_setter";
import {
  getThisMonthRange,
  getThisWeekRange,
  getTodayRange,
  getYesterdayRange,
} from "@/re_usables/utils/date_helpers";

export const handleQuickFilter = (type, setSelectedQuick, setFilteredBills) => {
  setSelectedQuick(type);
  let range = {};

  switch (type) {
    case "Today":
      range = getTodayRange();
      break;
    case "Yesterday":
      range = getYesterdayRange();
      break;
    case "This Week":
      range = getThisWeekRange();
      break;
    case "This Month":
      range = getThisMonthRange();
      break;
    default:
      return;
  }

  const from_date = range.start.toISOString().slice(0, 10);
  const to_date = range.end.toISOString().slice(0, 10);

  handleApply(from_date, to_date, setFilteredBills);
};

export const handleReset = async (setSelectedQuick, setFilteredBills) => {
  setSelectedQuick(null);
  await api_call_n_setter(`/api/bills`, "GET", setFilteredBills);
};

const handleApply = async (fromDate, toDate, setFilteredBills) => {
  if (!fromDate || !toDate) {
    alert("Please select a date range");
    return;
  }

  await api_call_n_setter(
    `/api/bills?from=${fromDate}&to=${toDate}`,
    "GET",
    setFilteredBills
  );
};
