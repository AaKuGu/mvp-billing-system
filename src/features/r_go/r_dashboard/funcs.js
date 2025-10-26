import { dbConnect } from "@/db/connectDB";
import Bill from "@/models/Bill";

export const bills_related_data_handler = async (user_id) => {
  await dbConnect();

  // Get the start and end of today
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  // Get all bills created today for the logged-in user
  const billsToday = await Bill.find({
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
    user_id,
  });

  // Calculate total bills and total sales
  const totalBills = billsToday.length;
  const totalSales = billsToday.reduce((sum, bill) => {
    const billData = JSON.parse(bill.stringifiedBill);
    return sum + (billData.grand_total || 0);
  }, 0);

  console.log("total sales : ", billsToday);
  console.log("total sales : ", totalSales);

  return { totalBills, totalSales };
};
