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

  let customer_id;

  if (!customer_details?.customer_id) {
    const { customer_name, customer_address_area, whatsapp_num } =
      customer_details;

    // Check if a customer with this WhatsApp number already exists
    let existingCustomer = await Customer.findOne({ whatsapp_num });

    if (existingCustomer) {
      // Compare key fields
      const isSame =
        existingCustomer.customer_name === customer_name &&
        existingCustomer.customer_address_area === customer_address_area;

      if (!isSame) {
        // Update the record only if there’s a change
        existingCustomer.customer_name = customer_name;
        existingCustomer.customer_address_area = customer_address_area;
        await existingCustomer.save();
        console.log("✅ Existing customer updated:", existingCustomer._id);
      } else {
        console.log("ℹ️ Customer found with same details, no update needed.");
      }

      customer_id = existingCustomer._id;
    } else {
      // Create new customer if WhatsApp number not found
      const customer_created = await Customer.create({
        user_id,
        customer_name,
        customer_address_area,
        whatsapp_num,
      });

      console.log("🆕 New customer created:", customer_created._id);
      customer_id = customer_created._id;
    }
  } else {
    console.log("ℹ️ Customer ID already provided.");
    customer_id = customer_details.customer_id;
  }

  const stringifiedBill = JSON.stringify(rest);

  const bill_created = await Bill.create({
    user_id,
    customer_id: customer_id,
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

// export const GET = controllerFunc(async (req) => {
//   await dbConnect();
//   const bills = await Bill.find().sort({ createdAt: -1 }).limit(10);
//   return successResponse({ bills }, "Bills fetched successfully");
// }, "Error in GET /bills");
