import { connectDB } from '@/lib/db'
import Order from '@/models/Order'
export const createOrder = async (orderData) => {
  await connectDB()
  const order = await Order.create(orderData)
  return order
}
export const getOrderById = async (id) => {
  await connectDB()
  const order = await Order.findById(id)
    .populate('items.product', 'name price image')
    .lean()
  order.items = order.items.map((item) => ({
    ...item,
    id: item.product?._id?.toString() ?? item.id,
  }))
  return JSON.parse(JSON.stringify({ ...order, id: order._id.toString() }))
}
