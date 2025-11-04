import { connectDB } from '@/lib/db'
import Cart from '@/models/Cart'
export const getCartByUserId = async (userId) => {
  await connectDB()
  const cart = await Cart.findOne({ userId })
    .populate('items.product', 'name price image inStock')
    .lean({ virtuals: true })
  if (!cart) return []

  return cart.items.map((item) => ({
    id: item.product?._id?.toString() ?? item.id,
    name: item.product?.name ?? item.name,
    price: item.product?.price ?? item.price,
    image: item.product?.image ?? item.image,
    color: item.color,
    inStock: item.product?.inStock ?? item.inStock,
    quantity: item.quantity,
  }))
}
export const syncCart = async (userId, items) => {
  await connectDB()
  const cart = await Cart.findOneAndUpdate(
    { userId: new Types.ObjectId(userId) },
    { $set: { items } },
    { new: true, upsert: true },
  )
  return cart
    ? JSON.parse(JSON.stringify({ ...cart, id: cart._id.toString() }))
    : null
}
