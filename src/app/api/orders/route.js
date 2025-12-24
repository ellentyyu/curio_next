import { connectDB } from '@/lib/db'
import Order from '@/models/Order'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { jsonSuccess, jsonFail } from '@/lib/client/apiResponse'
export async function POST(request) {
  try {
    await connectDB()
    // auth
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')?.value
    const decoded = token ? verifyToken(token) : null
    if (!decoded) {
      return jsonFail(401, 'Unauthorized')
    }
    // parse body
    const { items, shippingAddress, paymentMethod, totalPrice } =
      await request.json()

    if (!items || items.length === 0) {
      return jsonFail(400, 'Items are required')
    }
    const snapshotItems = items.map((item) => ({
      productId: item.product, // reference only
      quantity: item.quantity,
      image: item.image,
      price: item.price,
      color: item.color,
      name: item.name,
    }))
    // create order
    const order = await Order.create({
      user: decoded.id,
      items: snapshotItems,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      totalPrice,
    })
    const normalizedOrder = {
      id: order._id.toString(),
      userId: order.user.toString(),
      items: order.items.map((item) => ({
        id: item._id.toString(),
        productId: item.productId,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
        name: item.name,
      })),
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
    }

    return jsonSuccess(201, normalizedOrder)
  } catch (error) {
    console.error('create order error', error)
    return jsonFail(500, 'create order error')
  }
}
