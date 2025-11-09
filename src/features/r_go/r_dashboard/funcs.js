import { dbConnect } from "@/db/connectDB";
import Bill from "@/models/Bill";

// export const bills_related_data_handler = async (user_id) => {
//   await dbConnect();

//   // Get the start and end of today
//   const today = new Date();
//   const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//   // Get all bills created today for the logged-in user
//   const billsToday = await Bill.find({
//     createdAt: {
//       $gte: startOfDay,
//       $lte: endOfDay,
//     },
//     user_id,
//   });

//   // Calculate total bills and total sales
//   const totalBills = billsToday.length;
//   const totalSales = billsToday.reduce((sum, bill) => {
//     // Access grand_total directly from the bill's pricing_details
//     return sum + (bill.pricing_details?.grand_total || 0);
//   }, 0);

//   console.log("Bills today: ", billsToday.length);
//   console.log("Total sales: ", totalSales);

//   return { totalBills, totalSales };
// };

export const bills_related_data_handler = async (user_id) => {
  try {
    await dbConnect();

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Single aggregation query - most efficient
    const result = await Bill.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay },
          user_id: user_id,
        },
      },
      {
        $group: {
          _id: null,
          totalBills: { $sum: 1 },
          totalSales: { $sum: "$pricing_details.grand_total" },
        },
      },
    ]);

    const { totalBills = 0, totalSales = 0 } = result[0] || {};

    return {
      totalBills,
      totalSales: Math.round(totalSales * 100) / 100, // Round to 2 decimal places
    };
  } catch (error) {
    console.error("Error in bills_related_data_handler:", error);
    return { totalBills: 0, totalSales: 0 };
  }
};
