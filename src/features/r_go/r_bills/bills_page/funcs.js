import toast from "react-hot-toast";
import { fetchBills_api } from "./apiCalls";

export const fetchBills = async (setBills) => {
  const data = await fetchBills_api();
  if (data?.success) {
    setBills(data.bills);
    toast.success(data.message);
  }
};
