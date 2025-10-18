const firstTime = (productData, unit) => {
  console.log("productData v: ", productData);
  console.log("productData v ...: ", { ...productData });
  const unitsData = productData.units;
  const firstTime = productData.firstTime;
  if (firstTime) {
    console.log("first time");
    let found = false;
    const d = unitsData?.map((d, i) => {
      if (d?.unitName !== unit) {
        console.log("unit not equal to d?.unitName");
        if (found === false) {
          console.log("not found", d);
          const toReturn = { ...d, totalQuantity: d.totalQuantity - 1 };
          console.log("toReturn : ", toReturn);
          return toReturn;
        } else {
          console.log("found ");
          return d;
        }
      } else {
        console.log("unit == d.unitName");
        found = true;
        return d;
      }
    });
    console.log("d : duda : ", d);
    return { ...productData, units: d, firstTime: false };
  } else return productData;
};

export const calculateStock = (productData, totalQuantity, unit) => {
  console.log("Calculating stock for:", productData, totalQuantity, unit);

  const updated = {
    productName: productData.productName,
    units: productData.units,
  };

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
  // 🔄 Recalculate upper units based on remaining lower units
  // 🔄 Recalculate upper units based on remaining lower units
  for (let i = updated.units.length - 1; i > 0; i--) {
    const lower = updated.units[i];
    const upper = updated.units[i - 1];

    if (
      typeof lower.perParentQuantity === "number" &&
      lower.perParentQuantity > 0
    ) {
      upper.totalQuantity = Math.floor(
        lower.totalQuantity / lower.perParentQuantity
      );

      // ✅ Also update the pointer to match totalQuantity
      if (
        typeof upper.pointer !== "number" ||
        isNaN(upper.pointer) ||
        upper.pointer > upper.totalQuantity
      ) {
        upper.pointer = upper.totalQuantity;
      }
    } else {
      console.warn(`Invalid perParentQuantity at unit ${lower.unitName}`);
    }
  }

  // ✅ Finally, ensure all pointers are valid numbers
  updated.units = updated.units.map((u) => ({
    ...u,
    pointer:
      typeof u.pointer === "number" && !isNaN(u.pointer)
        ? u.pointer
        : u.totalQuantity,
  }));

  console.log("Final updated stock:", updated);
  return updated;
};
