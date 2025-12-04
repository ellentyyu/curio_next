import CartList from '@/components/cart/CartList'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { getCartByUserId } from '@/lib/actions/cartActions'
export default async function CartPage() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value
  const decodedToken = token ? verifyToken(token) : null
  let cart = null
  if (decodedToken) {
    cart = await getCartByUserId(decodedToken.id)
  }
  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <CartList />
      </div>
    </div>
  )
}
