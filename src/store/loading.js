import { create } from "zustand";

export const use_loading_store = create((set) => ({
  is_loading: false,
  message: null,
  show_loading: (message = null) => set({ is_loading: true, message }),
  hide_loading: () => set({ is_loading: false, message: null }),
}));
