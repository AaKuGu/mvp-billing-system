// "use client";

import React from "react";
// import React, { useEffect, useState } from "react";
import BillSummery from "../re_usables/BillSummery/BillSummery";
import { fetch_bill_details } from "../re_usables/server_actions";
// import { useBillsStore, useOneBillDetailStore } from "../re_usables/store";

const Bill_Summary = async ({ id }) => {
  // const [data, setData] = useState(null);
  // console.log("data : ", data);
  // const { getOneBillByBillId, bills } = useBillsStore();
  // const { oneBillDetail } = useOneBillDetailStore();

  // useEffect(() => {
  //   if (oneBillDetail) {
  //     // alert("Using oneBillDetail from store" + JSON.stringify(oneBillDetail));
  //     const parsed = JSON.parse(oneBillDetail.stringifiedBill);
  //     setData({ ...oneBillDetail, parsedBill: parsed });
  //   } else if (bills.length > 0) {
  //     // alert("Bills available in store: " + JSON.stringify(bills));
  //     if (id) {
  //       const bill = getOneBillByBillId(id);
  //       if (bill) {
  //         const parsed = JSON.parse(bill.stringifiedBill);
  //         setData({ ...bill, parsedBill: parsed });
  //       }
  //     }
  //   }
  // }, [id, getOneBillByBillId]);

  // if (!data)
  //   return <div className="p-4 text-gray-500">Loading bill details...</div>;

  // const createdDate = new Date(data.createdAt).toLocaleString();

  // const { customer_details, item_details, grand_total, bill_discount } =
  //   data?.parsedBill;

  const bill_details = await fetch_bill_details(id);

  const { stringifiedBill, customer_details } = JSON.parse(bill_details);

  const parsed_item_details = JSON.parse(stringifiedBill);

  const data = parsed_item_details;

  if (!bill_details)
    return <div className="p-4 text-gray-500">Loading bill details...</div>;

  const { item_details, pricing_details } = data;
  const created_date = new Date(data.createdAt).toLocaleString();

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <BillSummery
        customer_details={customer_details}
        item_details={item_details}
        pricing_details={pricing_details}
      />
    </div>
  );
};

export default Bill_Summary;
