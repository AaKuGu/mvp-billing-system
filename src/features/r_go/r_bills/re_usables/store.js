import { create } from "zustand";

export const useBillsStore = create((set, get) => ({
  bills: [],
  setBills: (bills) => set({ bills }),
  getOneBillByBillId: (billId) => {
    const { bills } = get();
    return bills.find((p) => p._id === billId || p.billId === billId || null);
  },
}));

export const useOneBillDetailStore = create((set) => ({
  oneBillDetail: null, // ✅ default value
  setOneBillDetail: (value) => set({ oneBillDetail: value }),
}));

