import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loading: false, // ✅ default value
  setLoading: (value) => set({ loading: value }),
  toggleLoading: () => set((state) => ({ loading: !state.loading })),
}));

export default useLoadingStore;
