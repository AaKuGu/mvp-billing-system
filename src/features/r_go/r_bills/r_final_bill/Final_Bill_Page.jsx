import React from "react";
import FinalBill from "./FinalBill/FinalBill";
// import { fetch_bill_details } from "../re_usables/server_actions";
import { fetch_bill_details } from "./funcs";

const Final_Bill_Page = async ({ id }) => {
  // const session = await auth.api.getSession({
  //   headers: await headers(), // you need to pass the headers object.
  // });

  // const user_id = session?.user?.id;

  const bill_details = await fetch_bill_details(id);

  const { stringifiedBill, customer_details, createdAt, _id } =
    JSON.parse(bill_details);

  const parsed_item_details = JSON.parse(stringifiedBill);

  const data = parsed_item_details;

  const { item_details, pricing_details } = data;
  const created_date = new Date(createdAt).toLocaleString();

  return (
    <div className={`w-full h-full `}>
      <FinalBill
        data={data}
        id={_id}
        created_date={created_date}
        customer_details={customer_details}
        item_details={item_details}
        pricing_details={pricing_details}
      />
    </div>
  );
};

export default Final_Bill_Page;
