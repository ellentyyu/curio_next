'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { logout } from '@/lib/user/logout'
export default function HydrationBridge({ userId, cart }) {
  const router = useRouter()
  const { cartItems, setCartItems, clearCart } = useCartStore()
  // sync cart items from server to client
  useEffect(() => {
    if (!cart) return
    setCartItems(cart)
  }, [cart, setCartItems])

  // sync cart items from client to server
  useEffect(() => {
    // TODO: MAKE SURE WONT SYNC IF LOGGED OUT OR EXPIRED
    if (!userId) return

    const syncCart = async () => {
      try {
        await fetch('/api/cart/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, cartItems }),
        })
      } catch (error) {
        console.log('HydrationBridge syncCart error', error)
      }
    }
    syncCart()
  }, [userId, cartItems])
  // logout user
  useEffect(() => {
    if (userId) return
    logout(router, clearCart)
  }, [userId, router])
  return null
}
