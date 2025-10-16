import { calculateStock } from "./funcs";

describe("calculateStock function", () => {
  let productData;

  beforeEach(() => {
    productData = {
      _doc: {
        units: [
          {
            level: 1,
            unitName: "Bag",
            perParentQuantity: null,
            totalQuantity: 50, // 50 Bags
            totalCost: 25000, // ₹25,000 for all bags
            unitCost: 500,
            pointer: null,
            unitSellingPrice: 7000,
            unitSellingPercentage: 0,
          },
          {
            level: 2,
            unitName: "Packet",
            perParentQuantity: 10, // 1 Bag = 10 Packets
            totalQuantity: 500, // 50 Bags × 10
            pointer: 500,
            unitCost: 50,
            unitSellingPrice: 500,
            unitSellingPercentage: 0,
          },
          {
            level: 3,
            unitName: "Kg",
            perParentQuantity: 5, // 1 Packet = 5 Kg
            totalQuantity: 2500, // 500 Packets × 5 Kg
            pointer: 2500,
            unitCost: 10,
            unitSellingPrice: 80,
            unitSellingPercentage: 0,
          },
        ],
      },
    };
  });

  it("reduces Bag stock correctly", () => {
    const updated = calculateStock(productData, 5, "Bag");
    expect(updated.units[0].totalQuantity).toBe(45);
    expect(updated.units[1].totalQuantity).toBe(450);
    expect(updated.units[2].totalQuantity).toBe(2250);
  });

  it("reduces Packet stock correctly", () => {
    const updated = calculateStock(productData, 5, "Packet");
    expect(updated.units[0].totalQuantity).toBe(50);
    expect(updated.units[1].totalQuantity).toBe(495);
    expect(updated.units[2].totalQuantity).toBe(2475);
  });

  it("returns undefined if unit is not found", () => {
    const updated = calculateStock(productData, 5, "invalid");
    expect(updated).toBeUndefined();
  });

  it("returns undefined if not enough stock", () => {
    const updated = calculateStock(productData, 999, "strip");
    expect(updated).toBeUndefined();
  });
});
