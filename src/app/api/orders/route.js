import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Order from '@/models/Order'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
export async function POST(request) {
  try {
    await connectDB()
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')?.value
    const decoded = token ? verifyToken(token) : null
    if (!decoded) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const { userId, items, shippingAddress, paymentMethod, totalPrice } =
      await request.json()

    const order = await Order.create({
      user: userId,
      items,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      totalPrice,
    })
    return NextResponse.json(
      {
        success: true,
        order: JSON.parse(
          JSON.stringify({ ...order, id: order._id.toString() }),
        ),
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
