import { dbConnect } from "@/db/connectDB";
import Bill from "@/models/Bill";
import Product from "@/models/Product";
import { controllerFunc } from "@/shared/backend/utils/ControllerFunc";
import successResponse from "@/shared/backend/utils/success/successResponse";
import { calculateStock } from "./funcs";

export const POST = controllerFunc(async (req) => {
  await dbConnect();
  const data = await req.json();

  console.log("Finalizing bill with data: ", data);

  const stringifiedBill = JSON.stringify(data);

  await Bill.create({ stringifiedBill });

  await Promise.all(
    data.map(async (item) => {
      const productData = await Product.findById(item.productId);
      if (!productData) return null;

      const updatedStock = calculateStock(
        productData,
        item.quantity,
        item.unit
      );

      return Product.updateOne(
        { _id: item.productId },
        { units: updatedStock.units }
      );
    })
  );

  return successResponse({}, "Bill Finalized Successfully!");
}, "Error in POST /bills");
