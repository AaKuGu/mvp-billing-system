import BillSummary from "@/features/Billing/BillListing/BillSummary/BillSummary";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  // return <ViewBillDetails id={id} />;
  return <BillSummary id={id} />;
};

export default page;
