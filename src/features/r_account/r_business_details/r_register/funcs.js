import {
  register_business_api_call,
  update_business_api_call,
} from "./apiCalls";

export const register_business_handler = async (form_data, router) => {
  const data = await register_business_api_call(form_data);
  if (data?.success) {
    router.push(`/account`);
  }
};
