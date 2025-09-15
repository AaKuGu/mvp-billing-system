const emptyBillProduct = {
  productName: "",
  quantity: 0,
  unit: "पीस",
  unitPrice: 0,
  totalPrice: 0,
};

//above one can be deleted any time

export const createEmptyBillData = () => ({
  id: crypto.randomUUID(), // ✅ new ID every call
  dataFromDB: null,
  itemDetails: { ...emptyBillProduct },
});
