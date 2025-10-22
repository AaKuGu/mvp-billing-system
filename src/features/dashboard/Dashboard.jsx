import React from "react";
import Bills from "./Bills";
import { dbConnect } from "@/db/connectDB";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Bill from "@/models/Bill";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  await dbConnect();

  // Get the start and end of today
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  // Get all bills created today
  const billsToday = await Bill.find({
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  // const totalBills = billsToday.length;

  return (
    <div className={`w-full h-full`}>
      {/* {JSON.stringify(billsToday[0]?.stringifiedBill)} */}
      {/* {totalBills} */}
      {/* <Bills /> */}
    </div>
  );
};

export default Dashboard;
