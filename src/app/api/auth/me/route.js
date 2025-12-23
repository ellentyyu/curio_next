import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { jsonSuccess, jsonFail } from '@/utils/apiResponse'

export async function GET() {
  try {
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')?.value
    const decoded = token ? verifyToken(token) : null
    return jsonSuccess(200, decoded ? { id: decoded.id } : null)
  } catch (error) {
    console.error('get user error', error)
    return jsonFail(500, 'get user error')
  }
}
