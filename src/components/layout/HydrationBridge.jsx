'use client'
import { useEffect, useRef } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { logout } from '@/lib/user/logout'
import { mergeCartItems } from '@/lib/cart/mergeCart'
export default function HydrationBridge({ userId, cart }) {
  const { cartItems, setCartItems, clearCart } = useCartStore()
  const { setUserId, clearUserId } = useUserStore()

  const hasInitCartRef = useRef(false)
  // sync server → client (user)
  useEffect(() => {
    if (userId) {
      setUserId(userId)
    } else {
      clearUserId()
      hasInitCartRef.current = false // reset for next login
    }
  }, [userId])

  // sync server → client (cart init/ merge)
  // run once after login
  useEffect(() => {
    if (!userId) return
    if (!Array.isArray(cart)) return
    if (hasInitCartRef.current) return

    const localCart = Array.isArray(cartItems) ? cartItems : []
    // when server cart is empty, use local cart
    // when local cart is empty, use server cart
    // otherwise merge the two
    const merged =
      cart.length === 0
        ? localCart
        : localCart.length === 0
          ? cart
          : mergeCartItems(cart, localCart)

    setCartItems(merged)
    hasInitCartRef.current = true
  }, [cart, userId])

  // sync client → server (cart)
  // run after init, whenever cart changes
  useEffect(() => {
    if (!userId) return
    if (!hasInitCartRef.current) return
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
    clearCart()
    logout()
  }, [userId])

  return null
}
