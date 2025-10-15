import FinalBill from "@/features/Billing/BillListing/finalBill/FinalBill";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  return <FinalBill id={id} />;
  // return <ViewBillDetails id={id} />;
};

export default page;
