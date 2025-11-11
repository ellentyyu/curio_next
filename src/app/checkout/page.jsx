import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { getCartByUserId } from '@/lib/actions/cartActions'
import { redirect } from 'next/navigation'
import CheckoutForm from '@/components/checkout/CheckoutForm'
const products = [
  {
    id: 1,
    name: 'Micro Backpack',
    href: '#',
    price: '$70.00',
    color: 'Moss',
    size: '5L',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/checkout-page-04-product-01.jpg',
    imageAlt:
      'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
  },
  {
    id: 2,
    name: 'Small Stuff Satchel',
    href: '#',
    price: '$180.00',
    color: 'Sand',
    size: '18L',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/checkout-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with tan canvas body, straps, handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 3,
    name: 'Carry Clutch',
    href: '#',
    price: '$70.00',
    color: 'White and Black',
    size: 'Small',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/checkout-page-04-product-03.jpg',
    imageAlt:
      'Folding zipper clutch with white fabric body, synthetic black leather accent strip, and black loop zipper pull.',
  },
]
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
export default async function CheckoutPage() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value
  const decodedToken = token ? verifyToken(token) : null
  if (!decodedToken) {
    redirect('/login?redirectTo=/checkout')
  }
  let cart = null
  if (decodedToken) {
    cart = await getCartByUserId(decodedToken.id)
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>
        <CheckoutForm cart={cart} userId={decodedToken.id} />
      </div>
    </div>
  )
}
