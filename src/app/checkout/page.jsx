import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { redirect } from 'next/navigation'
import CheckoutForm from '@/components/checkout/CheckoutForm'

export default async function CheckoutPage() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value
  const decodedToken = token ? verifyToken(token) : null
  if (!decodedToken) {
    redirect('/login?redirectTo=/checkout')
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>
        <CheckoutForm />
      </div>
    </div>
  )
}
