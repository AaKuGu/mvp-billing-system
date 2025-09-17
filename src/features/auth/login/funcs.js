import toast from "react-hot-toast";
import { loginAUser_api } from "./apiCall";

export const loginHandler = async (email, password, router, setLoading) => {
  const data = await loginAUser_api({ email, password });
  if (data) {
    toast.success(data?.message);
    router.push(`/go`);
  }
  setLoading(false);
};
