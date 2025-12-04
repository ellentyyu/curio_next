import { connectDB } from '@/lib/db'
import Cart from '@/models/Cart'
import { Types } from 'mongoose'
import { success, fail } from '@/lib/response'

export const getCartByUserId = async (userId) => {
  try {
    await connectDB()
    const cart = await Cart.findOne({ userId })
      .populate('items.product', 'name price image inStock')
      .lean()
    if (!cart) {
      return success(200, { items: [] })
    }
    const parsedItems = cart.items.map((item) => {
      const product = item.product // product or null
      return {
        id: product ? product._id.toString() : item.product.toString(),
        name: product ? product.name : '(unavailable)',
        price: product ? product.price : item.price,
        image: product ? product.image : null,
        inStock: product ? product.inStock : false,
        color: item.color,
        quantity: item.quantity,
      }
    })

    return success(200, { items: parsedItems })
  } catch (error) {
    console.error(error)
    return fail(500, { message: 'Failed to get cart' })
  }
}
// export const syncCart = async (userId, items) => {
//   try {
//     await connectDB()
//     const cart = await Cart.findOneAndUpdate(
//       { userId: new Types.ObjectId.createFromHexString(userId) },
//       { $set: { items } },
//       { new: true, upsert: true },
//     ).lean()

//     return success(200, {
//       id: cart._id.toString(),
//       items: cart.items.map((item) => ({
//         product: item.product.toString(),
//         quantity: item.quantity,
//         price: item.price,
//         color: item.color,
//       })),
//     })
//   } catch (error) {
//     console.error(error)
//     return fail(500, { message: 'Failed to sync cart' })
//   }
// }
