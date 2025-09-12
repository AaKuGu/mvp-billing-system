export const onSuggestionClick = (
  billingItems,
  setBillingItems,
  index,
  dataFromDB,
  hiLabel
) => {
  const _billingItems = [...billingItems];
  _billingItems[index] = {
    ..._billingItems[index],
    itemDetails: {
      ..._billingItems[index].itemDetails,
      productName: hiLabel,
    },
    dataFromDB: { ...dataFromDB },
  };
  setBillingItems(_billingItems);
};

export const productNameChangeHandler = (
  billingItems,
  setBillingItems,
  index,
  productName
) => {
  const _billingItems = [...billingItems];
  _billingItems[index] = {
    //clear row data & update productName only

    dataFromDB: null,
    itemDetails: {
      productName,
      quantity: 0,
      unit: "",
      unitPrice: 0,
      totalPrice: 0,
    },
  };
  setBillingItems(_billingItems);
};
