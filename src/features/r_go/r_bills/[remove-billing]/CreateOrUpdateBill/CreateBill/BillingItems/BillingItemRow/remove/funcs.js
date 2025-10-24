export const handleRemove = (billingItems, setBillingItems, index, id) => {
  setBillingItems(billingItems.filter((_) => _.id !== id));
};
