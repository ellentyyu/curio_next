import { syncCart } from '@/lib/actions/cartActions'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { Types } from 'mongoose'
import { connectDB } from '@/lib/db'
import Cart from '@/models/Cart'
import mongoose from 'mongoose'
export async function POST(request) {
  await connectDB()
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value
  const decoded = token ? verifyToken(token) : null
  if (!decoded) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { userId, cartItems } = await request.json()

  // Verify the user making the request matches the token
  if (decoded.id !== userId) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  // console.log('cartItems', typeof cartItems[0].id, cartItems[0].id)

  // Normalize and cast for Mongo
  const items = (cartItems || []).map((it) => ({
    product: it.id,
    quantity: Number(it.quantity) || 1,
    price: Number(it.price) || 0,
    color: it.color,
  }))

  const updated = await Cart.findOneAndUpdate(
    { userId: decoded.id },
    { $set: { items } },
    { new: true, upsert: true },
  ).populate('items.product', 'name price image')

  return NextResponse.json(JSON.parse(JSON.stringify(updated)), { status: 200 })
}
