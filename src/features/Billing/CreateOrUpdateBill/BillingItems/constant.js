const emptyBillProduct = {
  productName: "",
  quantity: null,
  unitName: "Pcs",
  unitPrice: null,
  totalPrice: null,
};

//above one can be deleted any time

export const createEmptyBillData = () => ({
  id: crypto.randomUUID(), // ✅ new ID every call
  dataFromDB: null,
  itemDetails: { ...emptyBillProduct },
});
