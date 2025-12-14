import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { redirect } from 'next/navigation'
import { getOrdersByUserId } from '@/lib/actions/orderActions'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

export default async function OrdersPage() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value
  const decodedToken = token ? verifyToken(token) : null
  if (!decodedToken) {
    redirect('/login?redirectTo=/orders')
  }

  const result = await getOrdersByUserId(decodedToken.id)
  if (!result.success) {
    throw new Error(result.error.message)
  }
  const orders = result.data
  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-xl">
          <h1
            id="your-orders-heading"
            className="text-3xl font-bold tracking-tight text-gray-900"
          >
            Your Orders
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </div>

        <div className="mt-12 space-y-16 sm:mt-16">
          {orders.map((order) => (
            <section key={order.id} aria-labelledby={`${order.id}-heading`}>
              <div className="space-y-1 md:flex md:items-baseline md:space-y-0 md:space-x-4">
                <h2
                  id={`${order.id}-heading`}
                  className="text-lg font-medium text-gray-900 md:shrink-0"
                >
                  Order #{order.id}
                </h2>
                <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                  <p className="text-sm font-medium text-gray-500">
                    {order.paymentStatus}
                  </p>
                  <div className="flex text-sm font-medium">
                    <a
                      href={`/order/${order.id}`}
                      className="text-accent hover:text-accent/80"
                    >
                      Manage order
                    </a>
                    {/* <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                      <a
                        href={`/order/${order.id}`}
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        View Invoice
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="mt-6 -mb-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
                {order.items.map((item) => (
                  <div key={item.id} className="py-6 sm:flex">
                    <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                      <Image
                        alt={item.name}
                        src={item.image}
                        className="size-20 flex-none rounded-md object-cover sm:size-48"
                        width={192}
                        height={192}
                      />
                      <div className="flex min-w-0 flex-1 flex-col pt-1.5 sm:pt-0">
                        <h3 className="text-sm text-gray-900">
                          <a href={`/product/${item.productId}`}>{item.name}</a>
                        </h3>
                        <p className="truncate text-sm text-gray-500">
                          <span>{item.color.join(', ')}</span>{' '}
                          {/* <span
                            aria-hidden="true"
                            className="mx-1 text-gray-400"
                          >
                            &middot;
                          </span>{' '}
                          <span>{item.color.join(', ')}</span> */}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.quantity} x $ {item.price}
                        </p>
                        <p className="mt-auto text-base text-gray-900">
                          $ {item.price * item.quantity}
                        </p>
                        {/* <div className="mt-1 flex text-sm">
                          <p className="text-gray-900">Price</p>
                          <p className="ml-2 text-gray-700">$ {item.price}</p>
                        </div>

                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-900">Quantity</p>
                          <p className="ml-2 text-gray-700">{item.quantity}</p>
                        </div> */}
                      </div>
                    </div>
                    <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:w-40 sm:flex-none">
                      <button
                        type="button"
                        className="flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-primary px-2.5 py-2 text-sm font-medium text-white shadow-xs hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-hidden sm:grow-0"
                      >
                        Buy again
                      </button>
                      {/* <button
                        type="button"
                        className="flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-hidden sm:grow-0"
                      >
                        Shop similar
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
