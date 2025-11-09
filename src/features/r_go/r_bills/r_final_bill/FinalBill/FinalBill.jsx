import React from "react";
import Print_Invoice_Button from "./Print_Invoice_Button";
import Share_Button from "./Share_Button";
import Printable_Invoice from "@/features/reusables/Printable_Invoice/Item_Details/Printable_Invoice";
import Print_Style from "./Print_Style";

const FinalBill = async ({ bill, id }) => {
  const {
    customer_details: { whatsapp_num },
  } = bill;
  return (
    <div className="p-6 font-sans h-full bg-gray-100">
      <Printable_Invoice bill={bill} />

      <div className={`flex w-full justify-center items-center gap-2 `}>
        <Print_Invoice_Button />
        <Share_Button data={{ bill_id: id, whatsapp_num }} />
      </div>

      <Print_Style />
    </div>
  );
};

export default FinalBill;
