import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  FunnelIcon,
  StarIcon,
} from '@heroicons/react/20/solid'
import { Suspense } from 'react'
import ProductWrapper from '@/components/product/ProductWrapper'
import { SpinnerIcon } from '@/components/ui/spinner'
import { getCategoryData } from '@/lib/mock-data/products'
import ProductFilter from '@/components/product/ProductFilter'
import ProductSorter from '@/components/product/ProductSorter'

const sortOptions = [
  { label: 'Newest', key: 'createdAt', order: 'desc' },
  { label: 'Price: Low to High', key: 'price', order: 'asc' },
  { label: 'Price: High to Low', key: 'price', order: 'desc' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default async function ProductPage({ searchParams }) {
  const { category, price, color, tag, sort } = await searchParams
  const categoryData = await getCategoryData(category)

  return (
    <>
      {/* list layout */}

      <div className="bg-bg">
        <div>
          <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                {`${categoryData?.name.charAt(0).toUpperCase()}${categoryData?.name.slice(1)}`}
              </h1>
              <p className="mt-4 text-base text-gray-500">
                {categoryData?.description}
              </p>
            </div>

            <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              {/* <aside>
                <h2 className="sr-only">Filters</h2>

                <div className="hidden lg:block">
                  <form className="divide-y divide-gray-200">
                    {filters.map((section) => (
                      <div
                        key={section.name}
                        className="py-10 first:pt-0 last:pb-0"
                      >
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-900">
                            {section.name}
                          </legend>
                          <div className="space-y-3 pt-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex gap-3">
                                <div className="flex h-5 shrink-0 items-center">
                                  <div className="group grid size-4 grid-cols-1">
                                    <input
                                      defaultValue={option.value}
                                      id={`${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      type="checkbox"
                                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                    />
                                    <svg
                                      fill="none"
                                      viewBox="0 0 14 14"
                                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                    >
                                      <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-checked:opacity-100"
                                      />
                                      <path
                                        d="M3 7H11"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="opacity-0 group-has-indeterminate:opacity-100"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <label
                                  htmlFor={`${section.id}-${optionIdx}`}
                                  className="text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    ))}
                  </form>
                </div>
              </aside> */}

              <ProductFilter />

              {/* Product grid */}
              <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                <Suspense fallback={<SpinnerIcon />}>
                  <ProductWrapper
                    category={category}
                    price={price}
                    color={color}
                    tag={tag}
                    sort={sort}
                  />
                </Suspense>
              </div>
            </div>

            {/* TODO: Pagination */}
            {/* <nav
              aria-label="Pagination"
              className="mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
            >
              <div className="min-w-0 flex-1">
                <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
                >
                  Previous
                </a>
              </div>
              <div className="hidden space-x-2 sm:flex">
                <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
                >
                  1
                </a>
                <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
                >
                  2
                </a>
                <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-indigo-600 bg-white px-4 ring-1 ring-indigo-600 hover:bg-gray-100 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
                >
                  3
                </a>
                <span className="inline-flex h-10 items-center px-1.5 text-gray-500">
                  ...
                </span>
                <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
                >
                  8
                </a>
                <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
                >
                  9
                </a>
                <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
                >
                  10
                </a>
              </div>
              <div className="flex min-w-0 flex-1 justify-end">
                <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
                >
                  Next
                </a>
              </div>
            </nav> */}
          </main>
        </div>
      </div>
    </>
  )
}
