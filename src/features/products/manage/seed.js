export const product = {
  productId: "123",
  productName: "First_product",
  units: [
    {
      level: 1,
      unitName: "Peti",
      perParentQuantity: null,
      totalQuantity: 1, // 50 Bags
      totalCost: 100, // ₹25,000 for all bags
      unitCost: 100,
      pointer: null,
      unitSellingPrice: 100,
      unitSellingPercentage: 0,
    },
    {
      level: 2,
      unitName: "patta",
      perParentQuantity: 2, // 1 Bag = 10 Packets
      totalQuantity: 2, // 50 Bags × 10
      pointer: 2,
      unitCost: 50,
      unitSellingPrice: 100,
      unitSellingPercentage: 100,
    },
    {
      level: 3,
      unitName: "pcs",
      perParentQuantity: 2, // 1 Packet = 5 Kg
      totalQuantity: 4, // 500 Packets × 5 Kg
      pointer: 4,
      unitCost: 25,
      unitSellingPrice: 50,
      unitSellingPercentage: 100,
    },
  ],
};

// export const product = {
//   productId: "",
//   productName: "",
//   units: [
//     // {
//     //   level: 1,
//     //   unitName: "Bag",
//     //   perParentQuantity: null,
//     //   totalQuantity: 50, // 50 Bags
//     //   totalCost: 25000, // ₹25,000 for all bags
//     //   unitCost: 500,
//     //   pointer: null,
//     //   // unitSellingPrice: 0,
//     //   // unitSellingPercentage: 0,
//     // },
//     // {
//     //   level: 2,
//     //   unitName: "Packet",
//     //   perParentQuantity: 10, // 1 Bag = 10 Packets
//     //   totalQuantity: 500, // 50 Bags × 10
//     //   pointer: 500,
//     //   unitCost: 50,
//     //   unitSellingPrice: 0,
//     //   unitSellingPercentage: 0,
//     // },
//     // {
//     //   level: 3,
//     //   unitName: "Kg",
//     //   perParentQuantity: 5, // 1 Packet = 5 Kg
//     //   totalQuantity: 2500, // 500 Packets × 5 Kg
//     //   pointer: 2500,
//     //   unitCost: 10,
//     //   unitSellingPrice: 0,
//     //   unitSellingPercentage: 0,
//     // },
//   ],
// };
