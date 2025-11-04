'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
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
    const logout = async () => {
      try {
        const res = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('logout response', res)
        if (res.ok) {
          router.refresh()
          // TODO: check
          clearCart()
        }
      } catch (error) {
        console.log('HydrationBridge error', error)
      }
    }
    logout()
  }, [userId, router])
  return null
}
