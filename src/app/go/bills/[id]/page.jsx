import ViewBillDetails from "@/features/Billing/BillListing/ViewBillDetail/ViewBillDetails";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  return <ViewBillDetails id={id} />;
};

export default page;
