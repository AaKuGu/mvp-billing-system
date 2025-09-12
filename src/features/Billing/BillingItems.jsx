import React, { useEffect, useState } from "react";
import BillingItemRow from "./BillingItemRow/BillingItemRow";
import { createEmptyBillData } from "./constant";
import PlusMinusButtons from "./PlusMinusButtons";
import Header from "@/shared/components/ui/Header";
import { fetchProducts } from "./funcs";

const  BillingItems = () => {
  // const [productsFromServer, setProductsFromServer] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [billingItems, setBillingItems] = useState();
  // const [selectedProductFromDB, setSelectedProductFromDB] = useState(null);

  // console.log("billing items : ", billingItems);

  // Fetch products
  useEffect(() => {
    setBillingItems([createEmptyBillData()]);
    fetchProducts(setFuse);
  }, []);

  return (
    <div>
      {/* emptyBillData = {JSON.stringify(emptyBillData)} */}
      {/* fuseDocsi = {JSON.stringify(fuse._docs)} */}
      {/* fuseDocs[i] = {JSON.stringify(fuseDocs[i].unit)} */}
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
      {/* Plus / Minus Buttons */}
      <PlusMinusButtons setBillingItems={setBillingItems} />
    </div>
  );
};

export default BillingItems;
