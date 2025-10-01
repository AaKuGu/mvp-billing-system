import { create } from "zustand";

export const useProductsStore = create((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  getOneProductByProductId: (productId) => {
    const { products } = get();
    return products.find(
      (p) => p._id === productId || p.productId === productId || null
    );
  },
}));
