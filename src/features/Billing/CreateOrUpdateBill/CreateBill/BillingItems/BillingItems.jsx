import React, { useEffect, useState } from "react";
import Header from "@/re_usables/components/ui/Header";
// import { fetchProducts } from "./api";
import { fetchProducts } from "../funcs";
import BillingItemRow from "./BillingItemRow/BillingItemRow";
import PlusMinusButtons from "./PlusMinusButtons";
import { createEmptyBillData } from "./funcs";
import FinalPrice from "./FinalPrice";
import { onlyItemDetailsHandler } from "@/features/Billing/shared/func";

const BillingItems = ({ billingItems, setBillingItems }) => {
  const [fuse, setFuse] = useState(null);

  console.log("fuse : ", fuse);

  // Fetch products
  useEffect(() => {
    setBillingItems([createEmptyBillData()]);
    fetchProducts(setFuse);
  }, []);

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
      <FinalPrice
        itemDetails={onlyItemDetailsHandler(billingItems)}
        setBillingItems={setBillingItems}
      />
      <PlusMinusButtons setBillingItems={setBillingItems} />
    </div>
  );
};

export default BillingItems;
