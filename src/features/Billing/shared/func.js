//following func will be used during the bill summary in the createorupdate feature as well as in bill listing
export const calculateGrandTotal = (itemDetails) => {
  const grandTotal = itemDetails?.reduce((acc, item) => {
    const totalPrice = Number(item?.totalPrice) || 0;
    return acc + totalPrice;
  }, 0);
  return grandTotal;
};
