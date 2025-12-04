'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { logout } from '@/lib/user/logout'
export default function HydrationBridge({ userId, cart }) {
  const router = useRouter()
  const { cartItems, setCartItems, clearCart } = useCartStore()
  const { setUserId, clearUserId } = useUserStore()
  // sync server → client (user)
  useEffect(() => {
    if (userId) setUserId(userId)
    else clearUserId()
  }, [userId])

  // sync server → client (cart)
  useEffect(() => {
    // logged in user has cart
    if (cart) setCartItems(cart)
  }, [cart])

  // sync client → server (cart)
  useEffect(() => {
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
    logout()
  }, [userId])

  return null
}
