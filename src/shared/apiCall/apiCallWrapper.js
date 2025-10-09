import toast from "react-hot-toast";

export const apiCallWrapper = async (
  apiFunc,
  errorContext = "API call error"
) => {
  try {
    // alert("api call wrapper called");

    const data = await apiFunc();

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
    // Network / unexpected error
    console.error(`❌ Exception [${errorContext}]:`, err);
    toast.error("Something went wrong, please try again");
    return null;
  }
};
