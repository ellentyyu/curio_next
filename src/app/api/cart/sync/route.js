import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { ObjectId } from 'mongodb'
import { connectDB } from '@/lib/db'
import Cart from '@/models/Cart'
import { jsonSuccess, jsonFail } from '@/utils/apiResponse'
export async function POST(request) {
  try {
    await connectDB()

    // authenticate user
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')?.value
    const decoded = token ? verifyToken(token) : null
    if (!decoded) {
      return jsonFail(401, 'Unauthorized')
    }

    const { userId, cartItems } = await request.json()

    // Ensure user syncing their own cart
    if (decoded.id !== userId) {
      return jsonFail(403, 'Forbidden')
    }

    // Normalize for db
    const items = (cartItems || []).map((it) => ({
      product: ObjectId.createFromHexString(it.id),
      quantity: Number(it.quantity) || 1,
      price: Number(it.price) || 0,
      color: it.color,
    }))

    await Cart.findOneAndUpdate(
      { userId: ObjectId.createFromHexString(decoded.id) },
      { $set: { items } },
      { new: true, upsert: true },
    )

    return jsonSuccess(200, { message: 'Cart synced successfully' })
  } catch (error) {
    console.error(error)
    return jsonFail(500, 'sync cart error')
  }
}
