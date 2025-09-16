// Get selected wholesale price

// Remove item handler

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
