import Final_Bill_Page from "@/features/r_go/r_bills/r_final_bill/Final_Bill_Page";
import React from "react";

const page = ({ params }) => {
  const { id } = params;

  return <Final_Bill_Page id={id} />;
  // return <FinalBill id={id} />;
  // return <ViewBillDetails id={id} />;
};

export default page;
