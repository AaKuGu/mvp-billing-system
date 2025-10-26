import { create } from "zustand";
import { initial_customer_initialize, initial_price_details } from "./constant";
import { createEmptyBillData } from "./BillingItems/funcs";

export const use_customer_details = create((set, get) => ({
  customer_details: initial_customer_initialize,
  set_customer_details: (data) => set({ customer_details: data }),
  set_customer_details_keyValue: (key, value) => {
    const { customer_details } = get();
    set({ customer_details: { ...customer_details, [key]: value } });
  },
  set_customer_details_null: () =>
    set({ customer_details: initial_customer_initialize }),
}));

export const use_billingItems_details = create((set, get) => ({
  billingItems: [],
  setBillingItems: (data) => set({ billingItems: data }),
  addAnEmptyItem: () => {
    const { billingItems } = get();
    set({ billingItems: [...billingItems, createEmptyBillData()] });
  },
  setBillingItems_null: () => set({ billingItems: [] }),
}));

export const use_pricing_details = create((set, get) => ({
  pricing_details: initial_price_details,
  set_pricing_details: (data) => set({ pricing_details: data }),
  set_pricing_details_keyValue: (key, value) => {
    const { pricing_details } = get();
    set({ pricing_details: { ...pricing_details, [key]: value } });
  },
  set_pricing_details_all_items_price: (price) => {
    const { pricing_details } = get();
    set({
      pricing_details: { ...pricing_details, price_before_discount: price },
    });
  },  
  set_pricing_details_null: () =>
    set({ pricing_details: initial_price_details }),
}));
