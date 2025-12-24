import { cookies } from 'next/headers'
import { jsonSuccess, jsonFail } from '@/lib/client/apiResponse'
export async function POST() {
  try {
    const cookiesStore = await cookies()
    cookiesStore.delete('token', { path: '/' })
    return jsonSuccess(200, { message: 'Logged out successfully' })
  } catch (error) {
    console.error('logout error', error)
    return jsonFail(500, 'logout error')
  }
}
