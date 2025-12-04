import { cookies } from 'next/headers'
import { jsonSuccess, jsonFail } from '@/utils/apiResponse'
export async function POST(request) {
  try {
    const cookiesStore = await cookies()
    cookiesStore.delete('token', { path: '/' })
    return jsonSuccess(200, { message: 'Logged out successfully' })
  } catch (error) {
    console.error('logout error', error)
    return jsonFail(500, 'logout error')
  }
}
