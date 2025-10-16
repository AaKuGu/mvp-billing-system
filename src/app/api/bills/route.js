import { dbConnect } from "@/db/connectDB";
import Bill from "@/models/Bill";
import Product from "@/models/Product";
import { controllerFunc } from "@/shared/backend/utils/ControllerFunc";
import successResponse from "@/shared/backend/utils/success/successResponse";
import { calculateStock } from "./funcs/funcs";

export const POST = controllerFunc(async (req) => {
  await dbConnect();
  const data = await req.json();

  console.log("Finalizing bill with data: ", data);

  const stringifiedBill = JSON.stringify(data);

  const bill_created = await Bill.create({ stringifiedBill });

  await Promise.all(
    data.itemDetails.map(async (item) => {
      const productData = await Product.findById(item.productId);

      console.log("product Data find by id : ", productData);

      if (!productData) return null;

      const updatedStock = calculateStock(
        productData,
        item.quantity,
        item.unitName
      );

      return Product.updateOne(
        { _id: item.productId },
        { units: updatedStock.units }
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
  const bills = await Bill.find().sort({ createdAt: -1 });
  return successResponse({ bills }, "Bills fetched successfully");
}, "Error in GET /bills");
