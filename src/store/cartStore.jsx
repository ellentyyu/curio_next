'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createJSONStorage } from 'zustand/middleware'
export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cartItems.find(
            (item) => item.id === product.id,
          )
          if (existingProduct) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }
          return {
            cartItems: [...state.cartItems, { ...product, quantity: 1 }],
          }
        }),
      removeFromCart: (product) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== product.id),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'curio-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
