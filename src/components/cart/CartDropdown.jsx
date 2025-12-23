'use client'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'

export default function CartDropdown() {
  const { cartItems } = useCartStore()

  const totalItems = cartItems?.reduce(
    (acc, product) => acc + product.quantity,
    0,
  )
  return (
    <div className="ml-4 flow-root text-sm lg:relative">
      <Link href="/cart" className="group flex items-center p-2">
        <ShoppingBagIcon
          aria-hidden="true"
          className="size-6 shrink-0 text-gray-400 group-hover:text-gray-600"
        />
        <span className="ml-2 block min-w-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {totalItems > 0 ? totalItems : ''}
        </span>
      </Link>
    </div>
  )
}
