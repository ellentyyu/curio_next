'use client'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const pages = [{ name: 'Orders', href: '/orders' }]
export default function NavMobile({ categories }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <p className="font-medium text-gray-900">Shop</p>
              <ul
                role="list"
                aria-labelledby="mobile-collection-heading"
                className="mt-6 space-y-6"
              >
                {categories.map((category) => (
                  <li key={category.name} className="flex">
                    <Link
                      href={
                        category.id === 0
                          ? '/product'
                          : `/product?category=${category.name}`
                      }
                      className="text-gray-500"
                      onClick={() => setOpen(false)}
                    >
                      {category.id === 0
                        ? 'Everything'
                        : `${category.name.charAt(0).toUpperCase()}${category.name.slice(1)}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={() => setOpen(false)}
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  href="/register"
                  className="-m-2 block p-2 font-medium text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  Create an account
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  href="/login"
                  className="-m-2 block p-2 font-medium text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <div className="flex flex-1 items-center lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="-ml-2 rounded-md bg-white p-2 text-gray-400"
        >
          <span className="sr-only">Open menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        {/* TODO: search functionality */}
        {/* <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Search</span>
          <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
        </a> */}
      </div>
    </>
  )
}
