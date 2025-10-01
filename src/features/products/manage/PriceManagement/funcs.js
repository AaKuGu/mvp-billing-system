export const onChangeHandler = (e, i, item, setProduct) => {
  if (item === "unitSellingPercentage") {
    const percentage = Number(e.target.value);

    setProduct((prev) => {
      const newUnits = [...prev.units];
      const cost = newUnits[i].unitCost || 0;

      newUnits[i] = {
        ...newUnits[i],
        unitSellingPercentage: percentage,
        unitSellingPrice: cost + (cost * percentage) / 100, // auto calc final price
      };

      return { ...prev, units: newUnits };
    });
  } else if (item === "unitSellingPrice") {
    const price = Number(e.target.value);
    setProduct((prev) => {
      const newUnits = [...prev.units];
      const cost = newUnits[i].unitCost || 0;

      // Avoid division by zero
      const percentage = cost > 0 ? ((price - cost) / cost) * 100 : 0;
      newUnits[i] = {
        ...newUnits[i],
        unitSellingPrice: price,
        unitSellingPercentage: percentage,
      };

      return { ...prev, units: newUnits };
    });
  }



};

export const savePricing = (setLoading) => {
    
}