import Link from 'next/link'
import NavMobile from './NavMobile'
import NavLink from './NavLink'
import CartDropdown from '../cart/CartDropdown'
import { getCategories } from '@/lib/mock-data/products.js'
import UserMenu from './UserMenu'

export default async function Header() {
  const categories = await getCategories()
  return (
    <div className="bg-white">
      <header className="relative bg-bg">
        <nav aria-label="Top">
          {/* promo */}
          <div className="bg-dark">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                Get free delivery on orders over $100
              </p>
            </div>
          </div>
          <div className="border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <NavMobile categories={categories} />

                {/* menus */}
                <div className="hidden h-full items-center space-x-8 lg:flex lg:flex-1">
                  {categories.map((category) => (
                    <NavLink key={category.name} category={category} />
                  ))}
                </div>

                {/* Logo */}
                <Link href="/product" className="flex">
                  <span className="sr-only">Your Company</span>
                  <h1 className="font-mrs-sheppards text-5xl text-primary">
                    Curio
                  </h1>
                </Link>

                <div className="flex flex-1 items-center justify-end">
                  {/* FEATURE: Currency selector */}
                  {/* <a
                    href="#"
                    className="hidden text-gray-700 hover:text-gray-800 lg:flex lg:items-center"
                  >
                    <Image
                      width={20}
                      height={15}
                      alt=""
                      src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                      className="block w-5 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a> */}
                  {/* FEATURE: Search */}
                  {/* <a
                    href="#"
                    className="ml-6 hidden p-2 text-gray-400 hover:text-gray-500 lg:block"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </a> */}
                  {/* User */}
                  <UserMenu />
                  {/* Cart */}
                  <CartDropdown />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
