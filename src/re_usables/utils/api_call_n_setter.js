// import { api_request } from "./api_request";

// // 🔹 Smart wrapper that calls and sets state in one line
// export const api_call_n_setter = async (
//   endpoint,
//   method = "GET",
//   setter = null,
//   body = null,
//   headers = {},
//   showToast = false
// ) => {
//   const res = await api_request(endpoint, method, body, headers);

//   if (res.success) {
//     if (setter) setter(res.data);
//     if (showToast) console.log("✅", res.message);
//   } else {
//     console.error("⚠️", res.message);
//     if (showToast) alert(res.message);
//   }

//   return res; // return result for further optional chaining
// };

import { use_loading_store } from "@/store/loading";
import toast from "react-hot-toast";
import { api_request } from "./api_request";

export const api_call_n_setter = async (
  endpoint,
  method = "GET",
  setter = null,
  body = null,
  headers = {},
  options = {}
) => {
  // 🌟 Defaults that fit 90% use cases
  const {
    show_loading = true,
    hide_loading = true,
    show_toast = false,
    loading_message = "Loading...",
    errorContext = "API call error",
    minVisibleDuration = 400,
  } = options;

  const { show_loading: showLoader, hide_loading: hideLoader } =
    use_loading_store.getState();

  const startTime = Date.now();

  try {
    if (show_loading) showLoader(loading_message);

    if (body && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    const res = await api_request(endpoint, method, body, headers);


    if (!res || typeof res !== "object") {
      console.warn("⚠️ Unexpected response format", res);
      if (show_toast) toast.error("Invalid response format");
      return null;
    }

    if (res.success) {
      if (setter) setter(res.data);
      if (show_toast) toast.success(res.message || "Success");
      return res;
    } else {
      alert("error");
      console.error(`⚠️ [${errorContext}]`, res.message);
      if (show_toast) toast.error(res.message || "Something went wrong");
      return null;
    }
  } catch (err) {
    console.error(`❌ Exception [${errorContext}]`, err);
    if (show_toast)
      toast.error(err?.message || "Something went wrong, please try again");
    return null;
  } finally {
    if (hide_loading) {
      const elapsed = Date.now() - startTime;
      const remaining = minVisibleDuration - elapsed;
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
      hideLoader();
    }
  }
};
