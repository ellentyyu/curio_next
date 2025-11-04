'use client'
import { useCartStore } from '@/store/cartStore'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
export default function CartList({ isLoggedIn, serverCartItems }) {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCartStore()
  const [mergedCartItems, setMergedCartItems] = useState(cartItems)
  const router = useRouter()
  const totalPrice = useMemo(() => {
    return mergedCartItems.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    )
  }, [mergedCartItems])

  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value)
    updateCartItemQuantity(productId, newQuantity)
  }
  const handleCheckout = () => {
    if (isLoggedIn) {
      router.push('/checkout')
    } else {
      router.push(`/login?redirectTo=${encodeURIComponent('/checkout')}`)
    }
  }
  useEffect(() => {
    if (isLoggedIn) {
      setMergedCartItems(serverCartItems)
    }
  }, [serverCartItems, isLoggedIn])
  return mergedCartItems.length > 0 ? (
    <form className="mt-12">
      <section aria-labelledby="cart-heading">
        <h2 id="cart-heading" className="sr-only">
          Items in your shopping cart
        </h2>

        <ul
          role="list"
          className="divide-y divide-gray-200 border-t border-b border-gray-200"
        >
          {mergedCartItems.map((product, idx) => (
            <li key={product.id} className="flex py-6 sm:py-10">
              <div className="shrink-0">
                <Image
                  alt={product.name}
                  src={product.image}
                  className="size-24 rounded-md object-cover sm:size-48"
                  width={100}
                  height={100}
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-sm">
                        <Link
                          href={`/product/${product.id}`}
                          className="font-medium text-gray-700 hover:text-gray-800"
                        >
                          {product.name}
                        </Link>
                      </h3>
                    </div>
                    <div className="mt-1 flex text-sm">
                      {product?.color?.length > 0 && (
                        <p className="text-gray-500">{product.color[0]}</p>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      ${product.price * product.quantity}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:pr-9">
                    <div className="grid w-full max-w-16 grid-cols-1">
                      <select
                        name={`quantity-${product.id}`}
                        aria-label={`Quantity, ${product.name}`}
                        className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(e, product.id)}
                      >
                        {Array.from({ length: product.inStock }, (_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                        {/* <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option> */}
                      </select>
                      {/* <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      /> */}

                      {/* <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-500 group-hover:text-gray-500"
                      /> */}
                    </div>

                    <div className="absolute top-0 right-0">
                      <button
                        type="button"
                        className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <span className="sr-only">Remove</span>
                        <XMarkIcon aria-hidden="true" className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                  {product.inStock > 0 ? (
                    <CheckIcon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-green-500"
                    />
                  ) : (
                    <ClockIcon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-gray-300"
                    />
                  )}
                  {/* TODO: Add leadTime */}
                  {/* <span>
                    {product.inStock
                      ? 'In stock'
                      : `Ships in ${product.leadTime}`}
                  </span> */}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Order summary */}
      <section aria-labelledby="summary-heading" className="mt-10">
        <h2 id="summary-heading" className="sr-only">
          Order summary
        </h2>

        <div>
          <dl className="space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-base font-medium text-gray-900">Subtotal</dt>
              <dd className="ml-4 text-base font-medium text-gray-900">
                ${totalPrice}
              </dd>
            </div>
          </dl>
          <p className="mt-1 text-sm text-gray-500">
            Shipping and taxes will be calculated at checkout.
          </p>
        </div>

        <div className="mt-10">
          <button
            type="button"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p>
            or{' '}
            <Link
              href="/product"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </section>
    </form>
  ) : (
    <div className="mt-12">
      <p className="mb-5 text-center text-2xl font-bold text-gray-700">
        Your cart is empty.
      </p>
      <p className="text-center text-base text-gray-600">
        Check your favorite products or{' '}
        <Link href="/product" className="text-indigo-600 hover:text-indigo-500">
          continue Shopping.
        </Link>
      </p>
    </div>
  )
}
