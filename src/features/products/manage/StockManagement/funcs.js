// when the quantity for the main unit changes, at that time, we need to recalculate the quantities for all sub-units
const recalculate_quantity_sub_units = (units) => {
  if (!units || units.length === 0) return;
  // recalc quantities for all sub-units after this
  let parentQty = units[0]?.totalQuantity || 0;
  for (let i = 1; i < units.length; i++) {
    const perParent = Number(units[i].perParentQuantity) || 0;
    const totalQty = parentQty * perParent;
    units[i] = {
      ...units[i],
      totalQuantity: totalQty,
      pointer: totalQty,
    };
    parentQty = totalQty;
    // units[i].totalQuantity = parentQty * (units[i].perParentQuantity || 0);
    // units[i].pointer = units[i].totalQuantity;
    // parentQty = units[i].totalQuantity;
  }
};

// Update sub-unit fields
export const updateSubUnit = (index, field, value, setProduct) => {
  setProduct((prev) => {
    const units = [...prev.units];
    units[index] = {
      ...units[index],
      [field]: field === "perParentQuantity" ? Number(value) : value,
    };

    recalculate_quantity_sub_units(units);

    return { ...prev, units };
  });
};

export const unitCloseHandler = (idx, product, setProduct) => {
  // alert(idx + 1);
  const unitsData = product.units;
  // alert(JSON.stringify(_a));
  const filteredData = unitsData.filter((_, i) => i <= idx);
  // alert(JSON.stringify(filteredData));
  setProduct((prev) => ({ ...prev, units: filteredData }));
};

// Add Level 1 unit (buying unit)
export const setLevel1Unit = (field, value, setProduct) => {
  setProduct((prev) => {
    let units = [...prev.units];
    if (units.length === 0) {
      // if level 1 not added yet
      units.push({
        level: 1,
        unitName: "",
        perParentQuantity: null,
        totalQuantity: 0,
        totalCost: 0,
        pointer: null,
      });
    }
    units[0] = {
      ...units[0],
      [field]:
        field === "totalQuantity" || field === "totalCost"
          ? Number(value)
          : value,
    };

    if (field === "totalQuantity" && units.length > 0) {
      // if totalQuantity changes, recalc all sub-units quantities
      recalculate_quantity_sub_units(units);
    }

    return { ...prev, units };
  });
};

// Add new sub-unit
export const addSubUnit = (setProduct) => {
  setProduct((prev) => {
    const units = [...prev.units];
    const level = units.length + 1;
    units.push({
      level,
      unitName: "",
      perParentQuantity: 0,
      totalQuantity: 0,
      pointer: 0,
    });
    return { ...prev, units };
  });
};
