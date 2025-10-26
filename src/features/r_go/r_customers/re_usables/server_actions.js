import { dbConnect } from "@/db/connectDB";
import Customer from "@/models/Customer";

export const fetch_customers_list_handler = async (user_id) => {
  try {
    await dbConnect();

    if (!user_id) {
      throw new Error("User Id is required");
    }

    const customers_list = await Customer.find({ user_id }).lean();

    return JSON.stringify(customers_list);
  } catch (error) {
    console.log("error : ", error);
    throw new Error(error);
  }
};
