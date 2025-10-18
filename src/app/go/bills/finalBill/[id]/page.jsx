import FinalBill from "@/features/Billing/BillListing/finalBillPage/FinalBillPage";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  return <FinalBill id={id} />;
  // return <ViewBillDetails id={id} />;
};

export default page;
