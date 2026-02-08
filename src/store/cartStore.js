import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (product) => {
        const existing = get().cart.find((item) => item.id === product.id);
        if (existing) {
          if (existing.quantity < product.stock) {
            set({
              cart: get().cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            });
            toast.success(`${product.name} added to cart!`);
          } else {
            toast.error("Max stock reached!");
          }
        } else {
          set({ cart: [...get().cart, { ...product, quantity: 1 }] });
          toast.success(`${product.name} added to cart!`);
        }
      },

      removeItem: (id) =>
        set({ cart: get().cart.filter((item) => item.id !== id) }),

      increaseQty: (id) =>
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }),

      decreaseQty: (id) =>
        set({
          cart: get().cart
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),

      clearCart: () => set({ cart: [] }),

      subtotal: () =>
        get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

      vat: () => get().subtotal() * 0.075,

      total: () => get().subtotal() + get().vat(),
    }),
    { name: "cart-storage" }
  )
);
