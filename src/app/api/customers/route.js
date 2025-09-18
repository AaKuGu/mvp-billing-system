import { dbConnect } from "@/db/connectDB";
import Customer from "@/models/Customer";
import { controllerFunc } from "@/shared/backend/utils/ControllerFunc";
import CustomError from "@/shared/backend/utils/error/CustomError";
import successResponse from "@/shared/backend/utils/success/successResponse";
import System_logs from "@/models/System_logs";

// POST - Create a new customer
export const POST = controllerFunc(async (req) => {
  await dbConnect();

  const errorContext = "Error in POST /customers";
  const body = await req.json();
  const { name, whatsappNumber, area } = body;

  // ✅ Validation
  if (
    !name ||
    typeof name !== "string" ||
    !whatsappNumber ||
    typeof whatsappNumber !== "string" ||
    !/^\d{10,15}$/.test(whatsappNumber) || // ✅ basic validation
    !area ||
    typeof area !== "string"
  ) {
    throw new CustomError(
      "Invalid input: name, valid whatsappNumber, and area are required",
      400,
      errorContext
    );
  }

  // ✅ Create new customer
  const newCustomer = await Customer.create({
    name,
    whatsappNumber,
    area,
  });

  // ✅ Log creation
  System_logs.create({
    operationType: "customer_created",
    payload: JSON.stringify({
      customerId: newCustomer._id,
      name: newCustomer.name,
      whatsappNumber: newCustomer.whatsappNumber,
      area: newCustomer.area,
    }),
  });

  return successResponse({ newCustomer }, "Customer Created Successfully", 201);
}, "Error in POST /customers");

// GET - Fetch all customers
export const GET = controllerFunc(async (req) => {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const parameter = searchParams.get("customer");

  const customers = await Customer.find().sort({ createdAt: -1 });

  return successResponse({ customers }, "Customers Fetched Successfully");
}, "Error in GET /customers");
