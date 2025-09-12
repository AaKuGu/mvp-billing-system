// Get selected wholesale price

// Remove item handler
export const handleRemove = (billingItems, i, setBillingItems) => {
  const updated = billingItems.filter((_, idx) => idx !== i);
  setBillingItems(updated);
};

export const onChangeHandler = (
  fieldName,
  value,
  billingItems,
  setBillingItems,
  index
) => {
  const _billingItems = [...billingItems];
  _billingItems[index] = {
    ..._billingItems[index],
    itemDetails: { ..._billingItems[index].itemDetails, [fieldName]: value },
  };
  setBillingItems(_billingItems);
};
