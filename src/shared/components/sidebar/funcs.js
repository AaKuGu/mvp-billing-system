import toast from "react-hot-toast";
import { logout_api } from "./apiCalls";
import { links } from "../constants";

export const logout = async (router, setLoading) => {
  const data = await logout_api();
  if (data) {
    toast.success(data?.message);
    router.push(links.landingPage);
  }
  setLoading(false);
};
