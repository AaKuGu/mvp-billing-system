import React from "react";
import FinalBill from "./FinalBill/FinalBill";
import Bill from "@/models/Bill";
import Customer from "@/models/Customer";
import { user_one_doc_ssr } from "@/re_usables/backend/utils/ssr/user_one_doc_ssr";

const Final_Bill_Page = async ({ id }) => {
  const { data: bill } = await user_one_doc_ssr(Bill, {
    filter: { _id: id },
    populate: "customer",
  });

  const { stringifiedBill, bill_number, customer, createdAt, _id } = bill;

  const parsed_item_details = JSON.parse(stringifiedBill);

  const data = parsed_item_details;

  const { item_details, pricing_details } = data;
  const created_date = new Date(createdAt).toLocaleString();

  return (
    <div className={`w-full h-full `}>
      <FinalBill
        data={data}
        bill_number={bill_number}
        id={_id}
        created_date={created_date}
        customer_details={customer}
        item_details={item_details}
        pricing_details={pricing_details}
      />
    </div>
  );
};

export default Final_Bill_Page;
