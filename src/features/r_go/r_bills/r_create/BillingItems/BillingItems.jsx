import React, { useEffect, useRef, useState } from "react";
import Header from "@/re_usables/components/ui/Header";
// import { fetchProducts } from "./api";
import { fetchProducts } from "../funcs";
import BillingItemRow from "./BillingItemRow/BillingItemRow";
import PlusMinusButtons from "./PlusMinusButtons";
import { createEmptyBillData } from "./funcs";
import FinalPrice from "../pricing_details/FinalPrice";
import {
  calculateGrandTotal,
  onlyItemDetailsHandler,
} from "../../re_usables/funcs";
import { use_billingItems_details, use_pricing_details } from "../store";

const BillingItems = () => {
  const { billingItems, setBillingItems, addAnEmptyItem } =
    use_billingItems_details();

  console.log("billingItems : ", billingItems);

  const { set_pricing_details, pricing_details } = use_pricing_details();

  const [fuse, setFuse] = useState(null);

  const isFirstRender = useRef(true);

  console.log("fuse : ", fuse);

  // Fetch products
  useEffect(() => {
    setBillingItems([createEmptyBillData()]);
    fetchProducts(setFuse);
  }, []);

  useEffect(() => {
    if (billingItems?.length) {
      localStorage.setItem("billingItems", JSON.stringify(billingItems));
    }
  }, [billingItems]);

  useEffect(() => {
    // if (isFirstRender.current) {
    //   isFirstRender.current = false;
    //   return;
    // }
    // alert("billing items : running not in first render");
    // const { discount = 0, gst_percent = 0 } = pricing_details;
    // calculateGrandTotal(
    //   billingItems,
    //   set_pricing_details,
    //   discount,
    //   gst_percent
    // );
  }, [billingItems]);

  return (
    <div className={`flex w-full flex-col`}>
      {/* <Header>Billing Items</Header> */}
      <div className="flex flex-col gap-2 mt-2">
        {billingItems?.map((d, i) => (
          <BillingItemRow
            key={d.id}
            rowData={d}
            index={i}
            billingItems={billingItems}
            setBillingItems={setBillingItems}
            fuse={fuse}
          />
        ))}
      </div>
      <PlusMinusButtons addAnEmptyItem={addAnEmptyItem} />
      {/* <FinalPrice
        itemDetails={onlyItemDetailsHandler(billingItems)}
        setBillingItems={setBillingItems}
      /> */}
    </div>
  );
};

export default BillingItems;
