export const calculateStock = (productData, totalQuantity, unit) => {
  console.log("Calculating stock for:", productData, totalQuantity, unit);

  const updated = { ...productData._doc };
  //   console.log("Initial stock:", updated);
  const soldQty = totalQuantity;
  // Find the index of the selected unit
  const unitIndex = updated.units.findIndex((u) => u.unitName === unit);
  console.log("Unit index:", unitIndex);
  if (unitIndex === -1) {
    console.log("Unit not found!");
    return;
  }
  const currentUnit = updated.units[unitIndex];
  if (soldQty > currentUnit.totalQuantity) {
    console.log("Not enough stock!");
    return;
  }
  // 🔹 Reduce current unit
  currentUnit.totalQuantity -= soldQty;
  //   console.log("After reducing current unit:", updated);
  const difference = currentUnit.pointer - currentUnit.totalQuantity;
  const a = Math.floor(difference / currentUnit.perParentQuantity);
  if (a >= 1) {
    currentUnit.pointer -= currentUnit.perParentQuantity * a;
  }
  let t = 1; // start with 1 for multiplication
  for (let i = unitIndex + 1; i <= updated.units.length - 1; i++) {
    t *= updated.units[i].perParentQuantity;
    updated.units[i].totalQuantity -= soldQty * t;
    const currentUnit = updated.units[i];

    const difference = currentUnit.pointer - currentUnit.totalQuantity;
    const a = Math.floor(difference / currentUnit.perParentQuantity);
    if (a >= 1) {
      currentUnit.pointer -= currentUnit.perParentQuantity * a;
    }
  }
  const upperIndexStart = unitIndex - 1;
  const func = (a, index) => {
    if (index < 0) {
      return;
    }
    const current = updated.units[index];
    current.totalQuantity -= a;
    const difference = current.pointer - current.totalQuantity;
    const b = Math.floor(difference / current.perParentQuantity);
    if (b >= 1) {
      current.pointer -= b * current.perParentQuantity;
      func(b, index - 1);
    }
  };
  func(a, upperIndexStart);
  console.log("Final updated stock:", updated);
  return updated;
};
