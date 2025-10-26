export const GET = controllerFunc(async (req) => {
  await dbConnect();
  const bills = await Bill.find().sort({ createdAt: -1 }).limit(10);
  return successResponse({ bills }, "Bills fetched successfully");
}, "Error in GET /bills");
