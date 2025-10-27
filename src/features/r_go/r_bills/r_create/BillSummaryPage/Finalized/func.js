import toast from "react-hot-toast";
import { finalizeBill_apiCall } from "./apiCalls";

export const finalizeHandler = async (
  preparedData,
  setFinalized,
  setLoading,
  setOneBillDetail
) => {
  setLoading(true);
  const data = await finalizeBill_apiCall(preparedData);
  // alert("Bill finalized!" + JSON.stringify(data));
  if (data?.success) {
    toast.success(data?.message);

    window.localStorage.removeItem("customer_details");
    window.localStorage.removeItem("pricing_details");
    window.localStorage.removeItem("billing_items");

    setFinalized(true);
    // alert("Bill finalized successfully!" + JSON.stringify(data?.Bill));
    setOneBillDetail(data?.Bill);

    //the reason to remove products is that since this handler will do stock updation and in localstorage stale data
    //of stock would remain, but since stock got updated hence i will remove the staled products data
    window.localStorage.removeItem("products");
    alert("is this working !" + JSON.stringify(data?.Bill));

    return data?.Bill;
  }
  // setLoading(false);
};
