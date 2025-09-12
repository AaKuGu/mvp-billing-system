const emptyBillProduct = {
  productName: "",
  quantity: 0,
  unit: "",
  unitPrice: 0,
  totalPrice: 0,
};

//above one can be deleted any time

export const emptyBillData = {
  dataFromDB: null,
  itemDetails: {
    ...emptyBillProduct,
  },
};
