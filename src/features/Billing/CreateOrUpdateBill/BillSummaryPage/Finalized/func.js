import toast from "react-hot-toast";
import { finalizeBill_apiCall } from "./apiCalls";

export const finalizeHandler = async (
  preparedData,
  setFinalized,
  setLoading,
  router,
  setOneBillDetail
) => {
  setLoading(true);
  const data = await finalizeBill_apiCall(preparedData);
  // alert("Bill finalized!" + JSON.stringify(data));
  if (data?.success) {
    toast.success(data?.message);
    setFinalized(true);
    // alert("Bill finalized successfully!" + JSON.stringify(data?.Bill));
    setOneBillDetail(data?.Bill);
    window.localStorage.removeItem("customerDetails");
    window.localStorage.removeItem("billingItems");

    //the reason to remove products is that since this handler will do stock updation and in localstorage stale data
    //of stock would remain, but since stock got updated hence i will remove the staled products data
    window.localStorage.removeItem("products");
    router.push(`/go/bills/finalBill/${data?.Bill?._id}`);
  }
  // setLoading(false);
};
