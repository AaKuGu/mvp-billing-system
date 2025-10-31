import { customer_suggestions_api_call } from "./api_calls";

export const customer_suggestions_handler = async (term, value) => {
  const data = await customer_suggestions_api_call(term, value);
  console.log("customer_suggestions_handler : ", data);
  if (data?.success) {
    return data?.customers;
  }
};
