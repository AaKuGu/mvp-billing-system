// "use client";

import React from "react";
// import React, { useEffect, useState } from "react";
import BillSummery from "../re_usables/BillSummery/BillSummery";
import Bill from "@/models/Bill";
import { user_one_doc_ssr } from "@/re_usables/backend/utils/ssr/user_one_doc_ssr";

const Bill_Summary = async ({ id }) => {
  const { data: bill } = await user_one_doc_ssr(Bill, {
    filter: { _id: id },
    populate: "customer",
  });

  const { stringifiedBill, customer } = bill;

  const parsed_item_details = JSON.parse(stringifiedBill);

  const data = parsed_item_details;

  const { item_details, pricing_details } = data;
  const created_date = new Date(data.createdAt).toLocaleString();

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <BillSummery
        customer_details={customer}
        item_details={item_details}
        pricing_details={pricing_details}
      />
    </div>
  );
};

export default Bill_Summary;
