"use server";

import { dbConnect } from "@/db/connectDB";
import Bill from "@/models/Bill";

export const fetch_bill_details = async (bill_id) => {
  try {
    await dbConnect();

    // throw new Error("bill id not defined");
    if (!bill_id) {
      throw new Error("bill id not defined");
    }

    const bill_data = await Bill.findById(bill_id)
      .populate("customer_id")
      .lean();

    //following is because, customer_id
    // contains the customer details, rather the name should be customer_details, but
    bill_data.customer_details = bill_data.customer_id;
    delete bill_data.customer_id;

    console.log("bill_data : ", bill_data);

    return JSON.stringify(bill_data);
  } catch (error) {
    console.log("error : ", error);
    throw new Error("error");
  }
};
