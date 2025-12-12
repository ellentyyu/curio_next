'use client'
import { useState } from 'react'
import { redirect } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { SpinnerIcon } from '@/components/ui/spinner'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: '$5.00',
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
]

const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
]

const DUMMY_USER = {
  email: 'test@test.com',
  name: 'John Doe',
  address: '123 Main St, Anytown, USA',
  city: 'Anytown',
  state: 'CA',
  country: 'United States',
  zip: '12345',
  cardNumber: '1234567890123456',
  nameOnCard: 'John Doe',
  expirationDate: '12/2025',
  cvc: '123',
}
export default function CheckoutForm({ userId }) {
  const { cartItems, cartReady, updateCartItemQuantity } = useCartStore()
  const [formData, setFormData] = useState(DUMMY_USER)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const postData = {
      userId,
      items: cartItems.map((item) => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
      })),
      shippingAddress: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zip: formData.zip,
      },
      paymentMethod: 'mock',
      paymentStatus: 'pending',
      totalPrice: cartItems.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
    }
    console.log('post data', postData)

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })

    if (!res.ok) {
      console.log('create order error', res.message)
      return { error: res.message }
    }

    const data = await res.json()
    console.log('result', data.order.items)
    redirect(`/order/${data?.order?.id}`)
  }
  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value)
    updateCartItemQuantity(productId, newQuantity)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
    >
      <div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Contact information
          </h2>

          <div className="mt-4">
            <label
              htmlFor="email-address"
              className="block text-sm/6 font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-medium text-gray-900">
            Shipping information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {/* <div>
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-700"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div> */}

            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* <div className="sm:col-span-2">
          <label
            htmlFor="apartment"
            className="block text-sm/6 font-medium text-gray-700"
          >
            Apartment, suite, etc.
          </label>
          <div className="mt-2">
            <input
              id="apartment"
              name="apartment"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
        </div> */}

            <div>
              <label
                htmlFor="city"
                className="block text-sm/6 font-medium text-gray-700"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="region"
                className="block text-sm/6 font-medium text-gray-700"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Country
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:outline-primary sm:text-sm/6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
                {/* <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            /> */}
              </div>
            </div>

            <div>
              <label
                htmlFor="postal-code"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  autoComplete="postal-code"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                  value={formData.zip}
                  onChange={(e) =>
                    setFormData({ ...formData, zip: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-10 border-t border-gray-200 pt-10">
          <fieldset>
            <legend className="text-lg font-medium text-gray-900">
              Delivery method
            </legend>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              {deliveryMethods.map((deliveryMethod) => (
                <label
                  key={deliveryMethod.id}
                  aria-label={deliveryMethod.title}
                  aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.price}`}
                  className="group relative flex rounded-lg border border-gray-300 bg-white p-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-primary has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                >
                  <input
                    defaultValue={deliveryMethod.id}
                    defaultChecked={deliveryMethod === deliveryMethods[0]}
                    name="delivery-method"
                    type="radio"
                    className="absolute inset-0 appearance-none focus:outline-none"
                  />
                  <div className="flex-1">
                    <span className="block text-sm font-medium text-gray-900">
                      {deliveryMethod.title}
                    </span>
                    <span className="mt-1 block text-sm text-gray-500">
                      {deliveryMethod.turnaround}
                    </span>
                    <span className="mt-6 block text-sm font-medium text-gray-900">
                      {deliveryMethod.price}
                    </span>
                  </div>
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="invisible size-5 text-indigo-600 group-has-checked:visible"
                  />
                </label>
              ))}
            </div>
          </fieldset>
        </div> */}

        {/* Payment */}
        <div className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-medium text-gray-900">Payment</h2>

          {/* <fieldset className="mt-4">
            <legend className="sr-only">Payment type</legend>
            <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
              {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                <div key={paymentMethod.id} className="flex items-center">
                  <input
                    defaultChecked={paymentMethodIdx === 0}
                    id={paymentMethod.id}
                    name="payment-type"
                    type="radio"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor={paymentMethod.id}
                    className="ml-3 block text-sm/6 font-medium text-gray-700"
                  >
                    {paymentMethod.title}
                  </label>
                </div>
              ))}
            </div>
          </fieldset> */}

          <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
            <div className="col-span-4">
              <label
                htmlFor="card-number"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Card number
              </label>
              <div className="mt-2">
                <input
                  id="card-number"
                  name="card-number"
                  type="text"
                  autoComplete="cc-number"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="col-span-4">
              <label
                htmlFor="name-on-card"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Name on card
              </label>
              <div className="mt-2">
                <input
                  id="name-on-card"
                  name="name-on-card"
                  type="text"
                  autoComplete="cc-name"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                  value={formData.nameOnCard}
                  onChange={(e) =>
                    setFormData({ ...formData, nameOnCard: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="col-span-3">
              <label
                htmlFor="expiration-date"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Expiration date (MM/YY)
              </label>
              <div className="mt-2">
                <input
                  id="expiration-date"
                  name="expiration-date"
                  type="text"
                  autoComplete="cc-exp"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                  value={formData.expirationDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expirationDate: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cvc"
                className="block text-sm/6 font-medium text-gray-700"
              >
                CVC
              </label>
              <div className="mt-2">
                <input
                  id="cvc"
                  name="cvc"
                  type="text"
                  autoComplete="csc"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6"
                  value={formData.cvc}
                  onChange={(e) =>
                    setFormData({ ...formData, cvc: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order summary */}
      <div className="mt-10 lg:mt-0">
        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
        {cartReady ? (
          <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-xs">
            <h3 className="sr-only">Items in your cart</h3>
            <>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product.id} className="flex px-4 py-6 sm:px-6">
                    <div className="shrink-0">
                      <img
                        alt={product.name}
                        src={product.image}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a
                              href={`/product/${product.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.name}
                            </a>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color.join(', ')}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.quantity} x {product.price}
                          </p>
                        </div>
                        {/* 
                    <div className="ml-4 flow-root shrink-0">
                      <button
                        type="button"
                        className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Remove</span>
                        <TrashIcon aria-hidden="true" className="size-5" />
                      </button>
                    </div> */}
                        <div className="ml-4">
                          <div className="grid grid-cols-1">
                            <select
                              name={`quantity-${product.id}`}
                              aria-label={`Quantity, ${product.name}`}
                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:outline-primary sm:text-sm/6"
                              value={product.quantity}
                              onChange={(e) =>
                                handleQuantityChange(e, product.id)
                              }
                            >
                              {Array.from(
                                { length: product.inStock },
                                (_, index) => (
                                  <option key={index} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ),
                              )}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          $ {product.price * product.quantity}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${' '}
                    {cartItems.reduce(
                      (acc, product) => acc + product.price * product.quantity,
                      0,
                    )}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${' '}
                    {cartItems
                      .reduce(
                        (acc, product) =>
                          acc + product.price * product.quantity * 0.05,
                        0,
                      )
                      .toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${' '}
                    {cartItems.reduce(
                      (acc, product) => acc + product.price * product.quantity,
                      0,
                    ) +
                      5 +
                      cartItems.reduce(
                        (acc, product) =>
                          acc + product.price * product.quantity * 0.05,
                        0,
                      )}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-primary-hover focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                >
                  Confirm order
                </button>
              </div>
            </>
          </div>
        ) : (
          <div className="flex justify-center py-10">
            <SpinnerIcon className="size-10 animate-spin" />
          </div>
        )}
      </div>
    </form>
  )
}
