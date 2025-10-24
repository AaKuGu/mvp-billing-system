import React from "react";
import { dbConnect } from "@/db/connectDB";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { bills_related_data_handler } from "./funcs";
import Dashboard_Card from "./re_usables/Dashboard_Card";

const Dashboard_Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user_id = session?.user?.id;

  const { totalBills, totalSales } = await bills_related_data_handler(user_id);

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Dashboard_Card
          title="Total Bills Today"
          value={totalBills}
          color="blue"
        />
        <Dashboard_Card
          title="Total Sales Today"
          value={`₹${totalSales.toLocaleString()}`}
          color="green"
        />
      </div>
    </div>
  );
};

export default Dashboard_Page;
