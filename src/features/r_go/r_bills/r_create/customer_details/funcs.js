import { customer_suggestions_api_call } from "./api_calls";

export const customer_suggestions_handler = async (user_id, customer_name) => {
  const data = await customer_suggestions_api_call(user_id, customer_name);
  if (data?.success) {
    return data?.customers;
  }
};

