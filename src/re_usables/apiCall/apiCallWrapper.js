import { use_loading_store } from "@/store/loading";
import toast from "react-hot-toast";

export const apiCallWrapper = async (
  apiFunc,
  errorContext = "API call error",
  options = {}
) => {
  const {
    should_show_loading = true, // show global loader by default
    should_hide_loading = false, // let route transition hide it normally
    loading_message = "Loading...", // message to display
    minVisibleDuration = 500, // at least 500ms visible to avoid blink
  } = options;

  const { show_loading, hide_loading } = use_loading_store.getState();
  let startTime = Date.now();
  try {
    // alert("api call wrapper called");

    if (should_show_loading) {
      show_loading(loading_message);
    }

    const data = await apiFunc();
    console.log("data : apiCallWrapper", data);

    if (data.success) {
      // alert("data.success")
      return data; // ✅ return success data
    } else {
      // API returned failure response
      console.error(`❌ API Error [${errorContext}]:`, data.message);
      toast.error(data.message || "Something went wrong");
      return null;
    }
  } catch (err) {
    console.error(
      `❌ Exception [${errorContext}]:`,
      err?.response?.data?.message
    );

    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong, please try again";

    toast.error(message);
    return null;
  } finally {
    if (should_hide_loading) {
      const elapsed = Date.now() - startTime;
      const remaining = minVisibleDuration - elapsed;

      if (remaining > 0) {
        // keep loader visible long enough to reach min duration
        await new Promise((res) => setTimeout(res, remaining));
      }
      hide_loading();
    }
  }
};

export const serverApiCallWrapper = async (
  apiFunc,
  errorContext = "API call error"
) => {
  try {
    const data = await apiFunc();
    if (data.success) {
      return data;
    } else {
      console.error(`[${errorContext}]`, data.message);
      // Optionally throw to propagate error up to API handler
      throw new Error(data.message || "Something went wrong");
    }
  } catch (err) {
    console.error(`[${errorContext}]`, err);
    throw err; // throw so API route can send error response
  }
};
