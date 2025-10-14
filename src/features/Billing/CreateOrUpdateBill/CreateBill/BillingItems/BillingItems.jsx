import React, { useEffect, useState } from "react";
import Header from "@/shared/components/ui/Header";
// import { fetchProducts } from "./api";
import { fetchProducts } from "../funcs";
import BillingItemRow from "./BillingItemRow/BillingItemRow";
import PlusMinusButtons from "./PlusMinusButtons";
import { createEmptyBillData } from "./funcs";

const BillingItems = ({ billingItems, setBillingItems }) => {
  const [fuse, setFuse] = useState(null);

  // Fetch products
  useEffect(() => {
    setBillingItems([createEmptyBillData()]);
    fetchProducts(setFuse);
  }, []);

  return (
    <div>
      <Header>Billing Items</Header>
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
      <PlusMinusButtons setBillingItems={setBillingItems} />
    </div>
  );
};

export default BillingItems;
