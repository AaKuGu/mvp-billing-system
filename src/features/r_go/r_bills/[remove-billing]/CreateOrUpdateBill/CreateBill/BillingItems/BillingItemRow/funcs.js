// Get selected wholesale price

// Remove item handler

export const onChangeHandler = (
  fieldName,
  value,
  billingItems,
  setBillingItems,
  index
) => {
  // alert(`fieldName: ${fieldName}, value: ${value}, index: ${index}`);

  const _billingItems = [...billingItems];
  _billingItems[index] = {
    ..._billingItems[index],
    itemDetails: { ..._billingItems[index].itemDetails, [fieldName]: value },
  };
  // alert(
  //   "updated itemDetails: " + JSON.stringify(_billingItems[index].itemDetails)
  // );
  setBillingItems(_billingItems);
};  
