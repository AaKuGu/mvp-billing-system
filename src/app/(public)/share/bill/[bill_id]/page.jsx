import Share_Bill_Server from "@/features/(public)/r_share/r_bill/r_bill_id/Share_Bill_Server";
import React from "react";

const page = ({ params }) => {
  const { bill_id } = params;
  return <Share_Bill_Server bill_id={bill_id} />;
};

export default page;
