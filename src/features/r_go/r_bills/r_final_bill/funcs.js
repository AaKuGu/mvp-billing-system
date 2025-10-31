import { fetch_bill_details_api } from "./api_calls";

export const fetch_bill_details = async (id) => {
  const data = await fetch_bill_details_api(id);
  if (data?.success) {
    return data.bill;
  }
};
