export async function logout(router, clearCart, showToast) {
  try {
    const res = await fetch('/api/auth/logout', { method: 'POST' })
    const result = await res.json()

    if (!result.success) {
      // showToast(result.error.message)
      console.error('logout error', result.error.message)
      return
    }

    clearCart()
    router.refresh()
    console.log('logged out')

    // showToast('Logged out')
  } catch (err) {
    console.error('logout error', err)
    // showToast('Network error')
  }
}
