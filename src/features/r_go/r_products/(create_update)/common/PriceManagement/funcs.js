// if you change the margin or final selling point of a unit, the other one should be auto calculated
export const onChangeHandler = (e, i, item, setProduct) => {
  if (item === "unitSellingPercentage") {
    const percentage = Number(e.target.value);

    setProduct((prev) => {
      const newUnits = [...prev.units];
      console.log("newUnits : " + JSON.stringify(newUnits));
      const cost = Number(newUnits[i].unitCost || 0);
      // const cost = newUnits[i].totalCost || 0;
      // console.log("cost : ", cost);
      // console.log("cost typeof : ", typeof cost);
      // console.log("percentage typeof : ", typeof percentage);
      // console.log("percentage : ", percentage);

      const unitSellingPrice = Number(cost + (cost * percentage) / 100);

      // console.log("unitSellingPrice : ", unitSellingPrice);

      // alert("unitSellingPrice : " + unitSellingPrice);

      newUnits[i] = {
        ...newUnits[i],
        unitSellingPercentage: parseFloat(percentage.toFixed(2)),
        unitSellingPrice: parseFloat(unitSellingPrice.toFixed(2)), // auto calc final price
      };

      return { ...prev, units: newUnits };
    });
  } else if (item === "unitSellingPrice") {
    const price = Number(e.target.value);
    setProduct((prev) => {
      const newUnits = [...prev.units];
      const cost = newUnits[i].unitCost || 0;

      // Avoid division by zero
      const percentage = Number(cost > 0 ? ((price - cost) / cost) * 100 : 0);
      newUnits[i] = {
        ...newUnits[i],
        unitSellingPrice: parseFloat(price.toFixed(2)),
        unitSellingPercentage: parseFloat(percentage.toFixed(2)),
      };

      return { ...prev, units: newUnits };
    });
  }
};

export const savePricing = (setLoading) => {};
