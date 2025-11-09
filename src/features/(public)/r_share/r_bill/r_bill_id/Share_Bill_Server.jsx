import Bill from "@/models/Bill";
import { user_one_doc_ssr } from "@/re_usables/backend/utils/ssr/user_one_doc_ssr";
import Customer from "@/models/Customer";
import React from "react";
import Share_Bill_Client from "./Share_Bill_Client";
import { dbConnect } from "@/db/connectDB";

const Share_Bill_Server = async ({ bill_id }) => {
  await dbConnect();

  const data = await Bill.findOne({ _id: bill_id }).lean();

  const bill = JSON.parse(JSON.stringify(data));

  return <Share_Bill_Client bill={bill} />;
};

export default Share_Bill_Server;
