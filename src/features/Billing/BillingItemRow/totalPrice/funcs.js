export const handleTotalPriceChange = (
  e,
  billingItems,
  d,
  setBillingItems,
  i
) => {
  const value = Number(e.target.value);
  const updated = [...billingItems];
  updated[i].totalPrice = value;
  setBillingItems(updated);
};
