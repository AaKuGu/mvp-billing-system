import Bill_Summary from "@/features/r_go/r_bills/r_summary/Bill_Summary";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  // return <ViewBillDetails id={id} />;
  // return <BillSummary id={id} />;
  return <Bill_Summary id={id} />;
};

export default page;
