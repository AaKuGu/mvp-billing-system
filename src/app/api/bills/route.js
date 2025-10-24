import { dbConnect } from "@/db/connectDB";
import Bill from "@/models/Bill";
import Product from "@/models/Product";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import successResponse from "@/re_usables/backend/utils/success/successResponse";
import { calculateStock } from "./funcs/funcs";

export const POST = controllerFunc(async (req) => {
  await dbConnect();
  const data = await req.json();

  console.log("Finalizing bill with data: ", data);

  const stringifiedBill = JSON.stringify(data);
  const user_id = data?.user_id;

  const bill_created = await Bill.create({ user_id, stringifiedBill });

  await Promise.all(
    data.itemDetails.map(async (item) => {
      const productData = await Product.findById(item.productId).lean();

      console.log("product Data find by id : ", productData);

      if (!productData) return null;

      const updatedStock = calculateStock(
        productData,
        item.quantity,
        item.unitName
      );

      return Product.updateOne(
        { _id: item.productId },
        { units: updatedStock.units, firstTime: updatedStock.firstTime }
      );
    })
  );

  return successResponse(
    { Bill: bill_created },
    "Bill Finalized Successfully!"
  );
}, "Error in POST /bills");

export const GET = controllerFunc(async (req) => {
  await dbConnect();
  const bills = await Bill.find().sort({ createdAt: -1 }).limit(10);
  return successResponse({ bills }, "Bills fetched successfully");
}, "Error in GET /bills");
