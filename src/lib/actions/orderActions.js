import { connectDB } from '@/lib/db'
import Order from '@/models/Order'
export const createOrder = async (orderData) => {
  await connectDB()
  const order = await Order.create(orderData)
  return order
}
