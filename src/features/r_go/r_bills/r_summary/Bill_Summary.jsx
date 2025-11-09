// "use client";

import React from "react";
// import React, { useEffect, useState } from "react";
import BillSummery from "../re_usables/BillSummery/BillSummery";
import Bill from "@/models/Bill";
import { user_one_doc_ssr } from "@/re_usables/backend/utils/ssr/user_one_doc_ssr";

const Bill_Summary = async ({ id }) => {
  const { data: bill } = await user_one_doc_ssr(Bill, {
    filter: { _id: id },
  });

  const { customer_details, pricing_details, item_details } = bill;

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
