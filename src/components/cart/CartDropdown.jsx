'use client'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'

export default function CartDropdown() {
  const { cartItems } = useCartStore()
  console.log('cartItems', cartItems)

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
  // dropdown version
  // return (
  //   <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
  //     <PopoverButton className="group -m-2 flex items-center p-2">
  //       <ShoppingBagIcon
  //         aria-hidden="true"
  //         className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
  //       />
  //       <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
  //         {totalItems}
  //       </span>
  //       <span className="sr-only">items in cart, view bag</span>
  //     </PopoverButton>
  //     <PopoverPanel
  //       transition
  //       className="absolute top-16 right-0 z-10 mt-px w-full bg-white pb-6 shadow-lg transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in sm:px-2 lg:top-full lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black/5"
  //     >
  //       <h2 className="sr-only">Shopping Cart</h2>

  //       <form className="mx-auto max-w-2xl px-4">
  //         <ul role="list" className="divide-y divide-gray-200">
  //           {totalItems > 0 ? (
  //             cartItems?.map((product) => (
  //               <li key={product.id} className="flex items-center py-6">
  //                 <img
  //                   alt={product.name}
  //                   src={product.image}
  //                   className="size-16 flex-none rounded-md border border-gray-200"
  //                 />
  //                 <div className="ml-4 flex-auto">
  //                   <h3 className="font-medium text-gray-900">
  //                     <Link href={`/product/${product.id}`}>
  //                       {product.name}
  //                     </Link>
  //                   </h3>
  //                   <p className="text-gray-500">{product.color}</p>
  //                 </div>
  //               </li>
  //             ))
  //           ) : (
  //             <li>
  //               <p>No items in cart</p>
  //             </li>
  //           )}
  //         </ul>

  //         {cartItems?.length > 0 && (
  //           <button
  //             type="submit"
  //             className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
  //           >
  //             Checkout
  //           </button>
  //         )}

  //         <p className="mt-6 text-center">
  //           <a
  //             href="#"
  //             className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
  //           >
  //             View Shopping Bag
  //           </a>
  //         </p>
  //       </form>
  //     </PopoverPanel>
  //   </Popover>
  // )
}
