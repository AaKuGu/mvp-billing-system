//following func will be used during the bill summary in the createorupdate feature as well as in bill listing
export const calculateGrandTotal = (itemDetails, discount = 0) => {
  const totalPrice = itemDetails?.reduce((acc, item) => {
    const _totalPrice = Number(item?.totalPrice) || 0;
    return acc + _totalPrice;
  }, 0);

  return {
    price_after_discount: Math.max(totalPrice - discount, 0),
    price_before_discount: totalPrice,
  };
};

export const onlyItemDetailsHandler = (billingItems) => {
  return billingItems?.map((d) => d?.itemDetails);
};
