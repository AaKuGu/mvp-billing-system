//above one can be deleted any time

//above one can be deleted any time

// import { emptyBillProduct } from "./constant";

function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback UUID v4 generator
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

import { emptyBillProduct } from "./constant";

export const createEmptyBillData = () => ({
  id: generateUUID(),
  dataFromDB: null,
  itemDetails: { ...emptyBillProduct },
});
