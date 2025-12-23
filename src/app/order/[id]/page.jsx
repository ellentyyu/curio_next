import { getOrderById } from '@/lib/actions/orderActions'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { redirect } from 'next/navigation'

export default async function OrderPage({ params }) {
  const { id } = await params
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value
  const decodedToken = token ? verifyToken(token) : null
  if (!decodedToken) {
    redirect(`/login?redirectTo=/order/${id}`)
  }

  let order = null
  const result = await getOrderById(id, decodedToken.id)
  if (!result.success) {
    if (result.status === 404 || result.status === 403) {
      notFound()
    }
    // only real server error reaches here
    throw new Error(result.error.message)
  }
  order = result.data
  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-accent">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            It&apos;s on the way!
          </p>
          <p className="mt-2 text-base text-gray-500">
            Your order #{order.id} is being processed and will be shipped soon.
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Tracking number</dt>
            <dd className="mt-2 text-dark">51547878755545848512</dd>
          </dl>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Your order</h2>

          <h3 className="sr-only">Items</h3>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex space-x-6 border-b border-gray-200 py-10"
            >
              <Image
                alt={item.name}
                src={item.image}
                className="size-20 flex-none rounded-lg bg-gray-100 object-cover sm:size-40"
                width={160}
                height={160}
              />
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900">
                    <a href={`/product/${item.productId}`}>{item.name}</a>
                    {/* <p className="text-gray-500 text-sm">
                      {item.product.description}
                    </p> */}
                  </h4>
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  <dl className="flex divide-x divide-gray-200 text-sm">
                    <div className="flex pr-4 sm:pr-6">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <dd className="ml-2 text-gray-700">{item.quantity}</dd>
                    </div>
                    <div className="flex pl-4 sm:pl-6">
                      <dt className="font-medium text-gray-900">Price</dt>
                      <dd className="ml-2 text-gray-700">$ {item.price}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">Addresses</h4>
            <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Shipping address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{order.shippingAddress.name}</span>
                    <span className="block">
                      {order.shippingAddress.address}
                    </span>
                    <span className="block">
                      {order.shippingAddress.state}{' '}
                      {order.shippingAddress.country}{' '}
                      {order.shippingAddress.zip}
                    </span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Billing address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{order.shippingAddress.name}</span>
                    <span className="block">
                      {order.shippingAddress.address}
                    </span>
                    <span className="block">
                      {order.shippingAddress.state}{' '}
                      {order.shippingAddress.country}{' '}
                      {order.shippingAddress.zip}
                    </span>
                  </address>
                </dd>
              </div>
            </dl>

            <h4 className="sr-only">Payment</h4>
            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Payment method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>Apple Pay</p>
                  <p>Mastercard</p>
                  <p>
                    <span aria-hidden="true">••••</span>
                    <span className="sr-only">Ending in </span>1545
                  </p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Shipping method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>DHL</p>
                  <p>Takes up to 3 working days</p>
                </dd>
              </div>
            </dl>

            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">$ {order.totalPrice}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Shipping</dt>
                <dd className="text-gray-700">$ 50</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">$ {order.totalPrice + 50}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
