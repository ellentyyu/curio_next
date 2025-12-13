import { connectDB } from '@/lib/db'
import Order from '@/models/Order'
import { success, fail } from '@/lib/response'

export const getOrderById = async (id, userId) => {
  try {
    await connectDB()
    const order = await Order.findById(id).lean()
    if (!order) {
      return fail(404, 'order not found')
    }
    if (order.user.toString() !== userId) {
      return fail(403, 'forbidden')
    }

    return success(200, {
      userId: order.user.toString(),
      id: order._id.toString(),
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
      updatedAt: order.updatedAt,
    })
  } catch (error) {
    console.error('get order by id error', error)
    return fail(500, 'get order by id failed')
  }
}
