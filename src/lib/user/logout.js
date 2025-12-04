export async function logout() {
  try {
    const res = await fetch('/api/auth/logout', { method: 'POST' })
    const result = await res.json()
    return result
  } catch (err) {
    console.error('network error', err)
    return { success: false, status: 500, error: 'network error' }
  }
}
