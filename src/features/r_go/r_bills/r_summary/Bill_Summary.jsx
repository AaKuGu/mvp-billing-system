"use client";

import React, { useEffect, useState } from "react";
import BillSummery from "../re_usables/BillSummery/BillSummery";
import { useBillsStore, useOneBillDetailStore } from "../re_usables/store";

const Bill_Summary = ({ id }) => {
  const [data, setData] = useState(null);
  console.log("data : ", data);
  const { getOneBillByBillId, bills } = useBillsStore();
  const { oneBillDetail } = useOneBillDetailStore();

  useEffect(() => {
    if (oneBillDetail) {
      // alert("Using oneBillDetail from store" + JSON.stringify(oneBillDetail));
      const parsed = JSON.parse(oneBillDetail.stringifiedBill);
      setData({ ...oneBillDetail, parsedBill: parsed });
    } else if (bills.length > 0) {
      // alert("Bills available in store: " + JSON.stringify(bills));
      if (id) {
        const bill = getOneBillByBillId(id);
        if (bill) {
          const parsed = JSON.parse(bill.stringifiedBill);
          setData({ ...bill, parsedBill: parsed });
        }
      }
    }
  }, [id, getOneBillByBillId]);

  if (!data)
    return <div className="p-4 text-gray-500">Loading bill details...</div>;

  const createdDate = new Date(data.createdAt).toLocaleString();

  const { customerDetails, itemDetails, grandTotal, bill_discount } =
    data?.parsedBill;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <BillSummery
        customerDetails={customerDetails}
        itemDetails={itemDetails}
        price_after_discount={grandTotal}
        price_before_discount={grandTotal + bill_discount}
        discountApplied={bill_discount}
      />
    </div>
  );
};

export default Bill_Summary;
