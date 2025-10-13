import { create } from "zustand";

const useOneBillDetailStore = create((set) => ({
  oneBillDetail: null, // ✅ default value
  setOneBillDetail: (value) => set({ oneBillDetail: value }),
}));

export default useOneBillDetailStore;
