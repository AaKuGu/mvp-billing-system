import toast from "react-hot-toast";

export const apiCallWrapper = async (
  apiFunc,
  errorContext = "API call error"
) => {
  try {
    // alert("api call wrapper called");

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
