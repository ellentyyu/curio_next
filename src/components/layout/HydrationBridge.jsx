'use client'
import { useEffect, useRef } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { logout } from '@/lib/domain/user/logout'
import { mergeCartItems } from '@/lib/domain/cart/mergeCart'
export default function HydrationBridge({ userId, cart }) {
  const { setUserId, clearUserId } = useUserStore()
  const { cartItems, setCartItems, clearCart, setCartReady } = useCartStore()

  const hasInitCartRef = useRef(false)
  // sync server → client (user)
  useEffect(() => {
    if (userId) {
      setUserId(userId)
    } else {
      clearUserId()
      hasInitCartRef.current = false // reset for next login
    }
  }, [userId, setUserId, clearUserId])

  // sync server → client (cart init/ merge)
  // run once after login
  useEffect(() => {
    if (!userId) return
    if (!Array.isArray(cart)) return
    if (hasInitCartRef.current) return

    const localCart = Array.isArray(cartItems) ? cartItems : []
    // sync cart by merging
    const hasServerCart = cart.length > 0
    const hasLocalCart = localCart.length > 0
    let merged
    if (!hasServerCart && hasLocalCart) {
      merged = localCart
    } else if (hasServerCart && !hasLocalCart) {
      merged = cart
    } else if (hasServerCart && hasLocalCart) {
      merged = mergeCartItems(cart, localCart)
    } else {
      merged = []
    }

    setCartItems(merged)
    setCartReady(true)
    hasInitCartRef.current = true
  }, [cart, userId, cartItems, setCartItems, setCartReady])

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
    setCartReady(false)
    logout()
  }, [userId, clearCart, setCartReady])

  return null
}
