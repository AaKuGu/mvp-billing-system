// export const handleUnitPriceChange = (e, billingItems, d, setBillingItems, i) => {
//   const value = Number(e.target.value);
//   const updated = [...billingItems];
//   updated[i].unitPrice = value;
//   setBillingItems(updated);
// };


export const handleUnitPriceChange = (
  e,
  billingItems,
  d,
  setBillingItems,
  i
) => {
  const value = Number(e.target.value);
  const updated = [...billingItems];

  updated[i].unitPrice = value;

  if (d?.quantity && d.quantity > 0) {
    updated[i].totalPrice = value * d.quantity;
  }

  setBillingItems(updated);
};
