import Bill from "@/models/Bill";
import Product from "@/models/Product";
import { controllerFunc } from "@/re_usables/backend/utils/ControllerFunc";
import successResponse from "@/re_usables/backend/utils/success/successResponse";
import { calculateStock } from "./funcs/funcs";
import Customer from "@/models/Customer";
import {
  create_user_doc_query,
  find_user_docs,
  find_user_docs_query,
  find_user_one_doc_query,
  update_user_doc_query,
} from "@/re_usables/backend/utils/queries";
import CustomError from "@/re_usables/backend/utils/error/CustomError";
import { getTodayRange } from "@/re_usables/utils/date_helpers";

export const POST = controllerFunc(async (req) => {
  const data = await req.json();

  console.log("Finalizing bill with data: ", data);

  const { customer_details, ...rest } = data;

  let customer;

  const user_id = req.context.user_id;

  if (!customer_details?.customer_id) {
    const { customer_name, customer_address_area, whatsapp_num } =
      customer_details;

    // Check if a customer with this WhatsApp number already exists
    // let existingCustomer = await Customer.findOne({ whatsapp_num });
    let existingCustomer = await find_user_one_doc_query(Customer, {
      user_id,
      filter: { whatsapp_num },
      lean: false,
    });

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

      customer = existingCustomer._id;
    } else {
      // Create new customer if WhatsApp number not found
      // const customer_created = await Customer.create({
      //   user_id,
      //   customer_name,
      //   customer_address_area,
      //   whatsapp_num,
      // });

      const customer_created = await create_user_doc_query(Customer, {
        user_id,
        data: { customer_name, customer_address_area, whatsapp_num },
        lean: false,
      });

      console.log("🆕 New customer created:", customer_created._id);
      customer = customer_created._id;
    }
  } else {
    // ✅ Validate that the provided customer_id belongs to this user
    const validCustomer = await find_user_one_doc_query(Customer, {
      user_id,
      filter: { _id: customer_details.customer_id },
    });

    if (!validCustomer) {
      throw new CustomError("Invalid customer ID", 400);
    }

    customer = customer_details.customer_id;
  }

  const stringifiedBill = JSON.stringify(rest);

  const { start, end } = getTodayRange();

  // 1️⃣ Count today's bills for this user
  const today_bill_count = await Bill.countDocuments({
    user_id,
    createdAt: { $gte: start, $lte: end },
  });

  // 2️⃣ Assign the next bill number
  const bill_number = today_bill_count + 1;

  const bill_created = await create_user_doc_query(Bill, {
    user_id,
    data: { customer, stringifiedBill, bill_number },
  });

  await Promise.all(
    data.item_details.map(async (item) => {
      const productData = await find_user_one_doc_query(Product, {
        user_id,
        filter: { _id: item.productId },
        lean: false, // need full doc to calculate and save stock
      });
      console.log("product Data find by id : ", productData);

      if (!productData) return null;

      const updatedStock = calculateStock(
        productData,
        item.quantity,
        item.unitName
      );

      return update_user_doc_query(Product, {
        user_id,
        filter: { _id: item.productId },
        update: {
          units: updatedStock.units,
          firstTime: updatedStock.firstTime,
        },
      });
    })
  );

  return successResponse(
    { Bill: bill_created },
    "Bill Finalized Successfully!"
  );
}, "Error in POST / bills");

export const GET = controllerFunc(async (req) => {
  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  // 🧠 Base filter
  const filter = {};

  // 🗓️ If both dates provided, filter within range
  if (from && to) {
    const fromDate = new Date(from);
    fromDate.setHours(0, 0, 0, 0);

    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);

    filter.createdAt = {
      $gte: fromDate,
      $lte: toDate,
    };
  }

  const bills = await find_user_docs_query(Bill, {
    user_id: req.context.user_id,
    sort: { createdAt: -1 },
    limit: 10,
    filter,
  });

  return successResponse(
    { data: bills },
    bills.length
      ? "Bills fetched successfully"
      : from && to
      ? "No bills found in this date range"
      : "No bills found"
  );
}, "Error in GET /bills");
