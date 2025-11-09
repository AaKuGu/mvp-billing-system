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

// export const POST = controllerFunc(async (req) => {
//   const data = await req.json();

//   console.log("Finalizing bill with data: ", data);

//   const { item_details, customer_details, pricing_details, business_details } =
//     data;

//   let customer;

//   const user_id = req.context.user_id;

//   if (!customer_details?.customer_id) {
//     const { customer_name, customer_address_area, whatsapp_num } =
//       customer_details;

//     // Check if a customer with this WhatsApp number already exists
//     // let existingCustomer = await Customer.findOne({ whatsapp_num });
//     let existingCustomer = await find_user_one_doc_query(Customer, {
//       user_id,
//       filter: { whatsapp_num },
//       lean: false,
//     });

//     if (existingCustomer) {
//       // Compare key fields
//       const isSame =
//         existingCustomer.customer_name === customer_name &&
//         existingCustomer.customer_address_area === customer_address_area;

//       if (!isSame) {
//         // Update the record only if there’s a change
//         existingCustomer.customer_name = customer_name;
//         existingCustomer.customer_address_area = customer_address_area;
//         await existingCustomer.save();
//         console.log("✅ Existing customer updated:", existingCustomer._id);
//       } else {
//         console.log("ℹ️ Customer found with same details, no update needed.");
//       }

//       customer = existingCustomer._id;
//     } else {
//       // Create new customer if WhatsApp number not found
//       // const customer_created = await Customer.create({
//       //   user_id,
//       //   customer_name,
//       //   customer_address_area,
//       //   whatsapp_num,
//       // });

//       const customer_created = await create_user_doc_query(Customer, {
//         user_id,
//         data: { customer_name, customer_address_area, whatsapp_num },
//         lean: false,
//       });

//       console.log("🆕 New customer created:", customer_created._id);
//       customer = customer_created._id;
//     }
//   } else {
//     // ✅ Validate that the provided customer_id belongs to this user
//     const validCustomer = await find_user_one_doc_query(Customer, {
//       user_id,
//       filter: { _id: customer_details.customer_id },
//     });

//     if (!validCustomer) {
//       throw new CustomError("Invalid customer ID", 400);
//     }

//     customer = customer_details.customer_id;
//   }

//   const stringifiedBill = JSON.stringify(rest);

//   const { start, end } = getTodayRange();

//   // 1️⃣ Count today's bills for this user
//   const today_bill_count = await Bill.countDocuments({
//     user_id,
//     createdAt: { $gte: start, $lte: end },
//   });

//   // 2️⃣ Assign the next bill number
//   const bill_number = today_bill_count + 1;

//   const bill_created = await create_user_doc_query(Bill, {
//     user_id,
//     data: { customer, stringifiedBill, bill_number },
//   });

//   await Promise.all(
//     data.item_details.map(async (item) => {
//       const productData = await find_user_one_doc_query(Product, {
//         user_id,
//         filter: { _id: item.productId },
//         lean: false, // need full doc to calculate and save stock
//       });
//       console.log("product Data find by id : ", productData);

//       if (!productData) return null;

//       const updatedStock = calculateStock(
//         productData,
//         item.quantity,
//         item.unitName
//       );

//       return update_user_doc_query(Product, {
//         user_id,
//         filter: { _id: item.productId },
//         update: {
//           units: updatedStock.units,
//           firstTime: updatedStock.firstTime,
//         },
//       });
//     })
//   );

//   return successResponse(
//     { Bill: bill_created },
//     "Bill Finalized Successfully!"
//   );
// }, "Error in POST / bills");

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

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Handles customer creation or retrieval
 * Returns customer_id
 */
async function handleCustomer(user_id, customer_details) {
  // If customer_id is provided, validate it
  if (customer_details?.customer_id) {
    const validCustomer = await find_user_one_doc_query(Customer, {
      user_id,
      filter: { _id: customer_details.customer_id },
    });

    if (!validCustomer) {
      throw new CustomError("Invalid customer ID", 400);
    }

    return customer_details.customer_id;
  }

  // Otherwise, create or update customer
  const { customer_name, customer_address_area, whatsapp_num } =
    customer_details;

  return await createOrUpdateCustomer(user_id, {
    customer_name,
    customer_address_area,
    whatsapp_num,
  });
}

/**
 * Creates a new customer or updates existing one based on WhatsApp number
 */
async function createOrUpdateCustomer(user_id, customerData) {
  const { customer_name, customer_address_area, whatsapp_num } = customerData;

  // Check if customer exists with this WhatsApp number
  let existingCustomer = await find_user_one_doc_query(Customer, {
    user_id,
    filter: { whatsapp_num },
    lean: false,
  });

  if (existingCustomer) {
    return await updateCustomerIfChanged(existingCustomer, {
      customer_name,
      customer_address_area,
    });
  }

  // Create new customer
  const customer_created = await create_user_doc_query(Customer, {
    user_id,
    data: { customer_name, customer_address_area, whatsapp_num },
    lean: false,
  });

  console.log("🆕 New customer created:", customer_created._id);
  return customer_created._id;
}

/**
 * Updates customer only if details have changed
 */
async function updateCustomerIfChanged(existingCustomer, newDetails) {
  const { customer_name, customer_address_area } = newDetails;

  const isSame =
    existingCustomer.customer_name === customer_name &&
    existingCustomer.customer_address_area === customer_address_area;

  if (!isSame) {
    existingCustomer.customer_name = customer_name;
    existingCustomer.customer_address_area = customer_address_area;
    await existingCustomer.save();
    console.log("✅ Existing customer updated:", existingCustomer._id);
  } else {
    console.log("ℹ️ Customer found with same details, no update needed.");
  }

  return existingCustomer._id;
}

/**
 * Generates the next bill number for today
 */
async function generateBillNumber(user_id) {
  const { start, end } = getTodayRange();

  const today_bill_count = await Bill.countDocuments({
    user_id,
    createdAt: { $gte: start, $lte: end },
  });

  return (today_bill_count + 1).toString();
}

/**
 * Prepares bill data according to schema structure
 */
function prepareBillData(data, bill_number, customer_id) {
  const { item_details, customer_details, pricing_details, business_details } =
    data;

  return {
    bill_number,
    customer_id,
    business_details: {
      businessName: business_details.businessName,
      businessTagline: business_details.businessTagline,
      businessDescription: business_details.businessDescription,
      gstNumber: business_details.gstNumber,
      businessAddress: business_details.businessAddress,
      businessEmail: business_details.businessEmail,
      businessContactNo: business_details.businessContactNo,
    },
    customer_details: {
      customer_name: customer_details.customer_name,
      whatsapp_num: customer_details.whatsapp_num,
      customer_address_area: customer_details.customer_address_area,
    },
    item_details: item_details.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      unitName: item.unitName,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    })),
    pricing_details: {
      price_before_discount: pricing_details.price_before_discount,
      discount: pricing_details.discount || 0,
      price_after_discount: pricing_details.price_after_discount,
      gst_percent: pricing_details.gst_percent || 0,
      gst_amount: pricing_details.gst_amount || 0,
      price_after_gst: pricing_details.price_after_gst || 0,
      round_off: pricing_details.round_off || 0,
      grand_total: pricing_details.grand_total,
      currency: pricing_details.currency || "INR",
    },
    stringifiedBill: JSON.stringify(data),
    status: "draft",
    issue_date: new Date(),
  };
}

/**
 * Updates product stock for a single item
 */
async function updateProductStock(user_id, item) {
  // Skip if no productId
  if (!item.productId) {
    return null;
  }

  const productData = await find_user_one_doc_query(Product, {
    user_id,
    filter: { _id: item.productId },
    lean: false,
  });

  if (!productData) {
    console.warn(`⚠️ Product not found for ID: ${item.productId}`);
    return null;
  }

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
}

/**
 * Updates stock for all items in the bill
 */
async function updateAllProductStocks(user_id, item_details) {
  const stockUpdatePromises = item_details.map((item) =>
    updateProductStock(user_id, item)
  );

  return Promise.all(stockUpdatePromises);
}

// ============================================
// MAIN HANDLER
// ============================================

export const POST = controllerFunc(async (req) => {
  const data = await req.json();

  console.log("Finalizing bill with data: ", data);

  const user_id = req.context.user_id;

  // 1. Handle customer (create/update/validate)
  const customer_id = await handleCustomer(user_id, data.customer_details);

  // 2. Generate bill number
  const bill_number = await generateBillNumber(user_id);

  // 3. Prepare bill data
  const billData = prepareBillData(data, bill_number, customer_id);

  // 4. Create bill
  const bill_created = await create_user_doc_query(Bill, {
    user_id,
    data: billData,
  });

  // 5. Update product stocks
  await updateAllProductStocks(user_id, data.item_details);

  return successResponse(
    { Bill: bill_created },
    "Bill Finalized Successfully!"
  );
}, "Error in POST /bills");
