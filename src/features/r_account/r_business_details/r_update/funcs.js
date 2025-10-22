import { update_business_api_call } from "./apiCalls";

export const update_business_handler = async (id, form_data, router) => {
  const data = await update_business_api_call(id, form_data);
  if (data?.success) {
    router.push(`/account`);
  }
};
