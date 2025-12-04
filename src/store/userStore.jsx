import { create } from 'zustand'
export const useUserStore = create((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
  clearUserId: () => set({ userId: null }),
}))
