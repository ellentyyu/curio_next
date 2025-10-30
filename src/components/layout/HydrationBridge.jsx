'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function HydrationBridge({ user }) {
  const router = useRouter()
  useEffect(() => {
    console.log('HydrationBridge user', user)
    if (!user) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((data) => {
          console.log('HydrationBridge data', data)
          router.refresh()
        })
        .catch((error) => {
          console.log('HydrationBridge error', error)
        })
    }
  }, [user, router])
  return null
}
