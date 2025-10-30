import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import CartList from '@/components/cart/CartList'
import { getServerCartItems } from '@/lib/mock-data/cart'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
export default async function CartPage() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value
  const isLoggedIn = token ? verifyToken(token) !== null : false
  console.log('isLoggedIn cart page', isLoggedIn)

  let serverCartItems = []
  if (isLoggedIn) {
    serverCartItems = await getServerCartItems()
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <CartList isLoggedIn={isLoggedIn} serverCartItems={serverCartItems} />
      </div>
    </div>
  )
}
