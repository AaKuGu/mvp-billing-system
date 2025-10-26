import { dbConnect } from "@/db/connectDB";
import Bill from "@/models/Bill";
import Product from "@/models/Product";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import successResponse from "@/re_usables/backend/utils/success/successResponse";
import { calculateStock } from "./funcs/funcs";
import Customer from "@/models/Customer";

export const POST = controllerFunc(async (req) => {
  await dbConnect();
  const data = await req.json();

  console.log("Finalizing bill with data: ", data);

  const { user_id, customer_details, ...rest } = data;

  let customerId;

  if (!customer_details?.customerId) {
    const { customer_name, customer_address_area, whatsapp_num } =
      customer_details;

    const customer_created = await Customer.create({
      user_id,
      customer_name,
      customer_address_area,
      whatsapp_num,
    });

    console.log("customer_created : ", customer_created);

    customerId = customer_created?._id;
  } else {
    customerId = customer_details?.customerId;
  }

  const stringifiedBill = JSON.stringify(rest);

  const bill_created = await Bill.create({
    user_id,
    customer_id: customerId,
    stringifiedBill,
  });

  await Promise.all(
    data.item_details.map(async (item) => {
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
