//above one can be deleted any time

import { emptyBillProduct } from "./constant";

export const createEmptyBillData = () => ({
  id: crypto.randomUUID(), // ✅ new ID every call
  dataFromDB: null,
  itemDetails: { ...emptyBillProduct },
});
