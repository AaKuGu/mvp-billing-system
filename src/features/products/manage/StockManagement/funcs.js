export const saveProduct = (product, setProduct) => {
  let _product = { ...product };
  _product.units.forEach((d, i) => {
    if (i === 0) {
      d.unitCost = d.totalCost / d.totalQuantity;
    } else {
      const parentUnit = _product.units[i - 1];
      d.unitCost = parentUnit.unitCost / d.perParentQuantity;
    }
  });
  setProduct(_product);
};
