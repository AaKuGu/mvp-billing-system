// import { product } from "@/features/products/manage/seed";

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

//following func will help not listing the same product already added into billingItems also whose last unit stock is 0

export const already_added_and_0_stock_product_filter_handler = (
  suggestionProducts,
  billingItems
) =>
  suggestionProducts.filter((p) => {
    if (p.item.units[p.item.units.length - 1].totalQuantity === 0) return false;
    else
      return !billingItems.some(
        (d) => d.itemDetails.productName === p.item.productName
      );
  });
