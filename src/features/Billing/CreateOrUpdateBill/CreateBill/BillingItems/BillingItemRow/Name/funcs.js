import { product } from "@/features/products/manage/seed";

export const onSuggestionClick = (
  billingItems,
  setBillingItems,
  index,
  dataFromDB,
  productName,
  setUnitPrice,
  setUnitName
) => {
  // alert("Unit cost : " + JSON.stringify(dataFromDB.units[0].unitName));

  const _billingItems = [...billingItems];
  _billingItems[index] = {
    ..._billingItems[index],
    itemDetails: {
      ..._billingItems[index].itemDetails,
      productName,
      productId: dataFromDB._id,
      unitPrice: dataFromDB.units[0].unitSellingPrice,
      unitName: dataFromDB.units[0].unitName,
    },
    dataFromDB: { ...dataFromDB },
  };
  setBillingItems(_billingItems);
  setUnitPrice(dataFromDB.units[0].unitSellingPrice);
  setUnitName(dataFromDB.units[0].unitName);
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
    ..._billingItems[index],
    dataFromDB: null,
    itemDetails: {
      productName,
      quantity: 0,
      unitName: "Pcs",
      unitPrice: 0,
      totalPrice: 0,
    },
  };
  setBillingItems(_billingItems);
};
