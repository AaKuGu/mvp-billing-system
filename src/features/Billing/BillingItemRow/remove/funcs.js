export const handleRemove = () => {
  setBillingItems(billingItems.filter((_, idx) => idx !== i));
};
