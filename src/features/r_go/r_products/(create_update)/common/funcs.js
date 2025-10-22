//following is the helper function to set unitCost for each unit before saving or updating a product
export const unitCostSettingToProduct = (product) => {
  let _product = { ...product };
  _product?.units?.forEach((d, i) => {
    if (i === 0) {
      if (d?.totalCost && d?.totalQuantity)
        d.unitCost = parseFloat((d?.totalCost / d?.totalQuantity).toFixed(2));
    } else {
      const parentUnit = _product.units[i - 1];
      d.unitCost = parseFloat(
        (parentUnit?.unitCost / d?.perParentQuantity).toFixed(2)
      );
    }
  });

  console.log("After unitCost setting _product : ", _product);

  return _product;
};
