import React from "react";
import FinalBill from "./FinalBill/FinalBill";
import Bill from "@/models/Bill";
import Customer from "@/models/Customer";
import { user_one_doc_ssr } from "@/re_usables/backend/utils/ssr/user_one_doc_ssr";

const Final_Bill_Page = async ({ id }) => {
  const { data: bill } = await user_one_doc_ssr(Bill, {
    filter: { _id: id },
  });

  return (
    <div className={`w-full h-full `}>
      <FinalBill bill={bill} id={id} />
    </div>
  );
};

export default Final_Bill_Page;
