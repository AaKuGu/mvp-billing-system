import toast from "react-hot-toast";
import { finalizeBill_apiCall } from "./apiCalls";

export const finalizeHandler = async (
  preparedData,
  setFinalized,
  setOneBillDetail,
  router,
  setBillingItems_null,
  set_customer_details_null,
  set_pricing_details_null
) => {
  const data = await finalizeBill_apiCall(preparedData);
  // alert("Bill finalized!" + JSON.stringify(data));
  if (data?.success) {
    toast.success(data?.message);

    window.localStorage.removeItem("customer_details");
    window.localStorage.removeItem("pricing_details");
    window.localStorage.removeItem("billingItems");

    setFinalized(true);
    // alert("Bill finalized successfully!" + JSON.stringify(data?.Bill));
    setOneBillDetail(data?.Bill);

    //the reason to remove products is that since this handler will do stock updation and in localstorage stale data
    //of stock would remain, but since stock got updated hence i will remove the staled products data
    window.localStorage.removeItem("products");

    setBillingItems_null();
    set_customer_details_null();
    set_pricing_details_null();

    // alert(JSON.stringify(data?.Bill, null, 2));

    router.push(`/go/bills/finalBill/${data?.Bill?._id}`);
  }
};
