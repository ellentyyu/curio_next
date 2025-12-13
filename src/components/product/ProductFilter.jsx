'use client'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { FunnelIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useEffect, useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
const filters = {
  price: [
    { value: '0', label: '$0 - $25', checked: false },
    { value: '25', label: '$25 - $50', checked: false },
    { value: '50', label: '$50 - $75', checked: false },
    { value: '75', label: '$75+', checked: false },
  ],
  color: [
    { value: 'white', label: 'White', checked: false },
    { value: 'beige', label: 'Beige', checked: false },
    { value: 'blue', label: 'Blue', checked: false },
    { value: 'brown', label: 'Brown', checked: false },
    { value: 'green', label: 'Green', checked: false },
    { value: 'purple', label: 'Purple', checked: false },
  ],
  tag: [
    { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
    { value: 'tees', label: 'Tees', checked: false },
    { value: 'objects', label: 'Objects', checked: false },
    { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
    { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
  ],
}

// const sideFilter = [
//   {
//     id: 'color',
//     name: 'Color',
//     options: [
//       { value: 'white', label: 'White', checked: false },
//       { value: 'beige', label: 'Beige', checked: false },
//       { value: 'blue', label: 'Blue', checked: false },
//       { value: 'brown', label: 'Brown', checked: false },
//       { value: 'green', label: 'Green', checked: false },
//       { value: 'purple', label: 'Purple', checked: false },
//     ],
//   },
//   {
//     id: 'tag',
//     name: 'Tag',
//     options: [
//       { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
//       { value: 'tees', label: 'Tees', checked: false },
//       { value: 'objects', label: 'Objects', checked: false },
//       { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
//       { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
//     ],
//   },
// ]
const sortOptions = [
  { name: 'Newest', value: 'newest' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedFilters, setSelectedFilters] = useState(() =>
    structuredClone(filters),
  )

  const handleFilterChange = (filter, value) => {
    // setSelectedFilters((prev) => ({
    //   ...prev,
    //   [filter]: prev[filter].map((option) => ({
    //     ...option,
    //     checked: option.value === value ? !option.checked : option.checked,
    //   })),
    // }))
    const params = new URLSearchParams(searchParams)

    const current = params.get(filter)?.split(',') ?? []
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]

    if (next.length > 0) params.set(filter, next.join(','))
    else params.delete(filter)

    router.replace(`/product?${params.toString()}`, { scroll: false })
  }

  const filterCount = Object.values(selectedFilters).reduce((acc, filter) => {
    return acc + filter.filter((option) => option.checked).length
  }, 0)
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')

  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sort)
    router.replace(`/product?${params.toString()}`, { scroll: false })
  }
  // sync url params to selected filters
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries())
    setSelectedFilters((prev) => {
      const next = structuredClone(prev)

      for (let filter in next) {
        const active = params[filter]?.split(',') ?? []
        next[filter] = next[filter].map((option) => ({
          ...option,
          checked: active.includes(option.value),
        }))
      }
      return next
    })

    setSort(params.sort || 'newest')
  }, [searchParams])

  // sync selected filters to url params
  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams)
  //   for (const [filter, options] of Object.entries(selectedFilters)) {
  //     const active = options.filter((o) => o.checked).map((o) => o.value)
  //     if (active.length > 0) params.set(filter, active.join(','))
  //     else params.delete(filter)
  //   }
  //   router.push(`/product?${params.toString()}`)
  // }, [selectedFilters])

  return (
    <>
      {/* <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center border-t border-b border-gray-200"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div className="pr-6">
              <DisclosureButton className="group flex cursor-pointer items-center font-medium text-gray-700">
                <FunnelIcon
                  aria-hidden="true"
                  className="mr-2 size-5 flex-none text-gray-400 group-hover:text-gray-500"
                />
                {filterCount} Filters
              </DisclosureButton>
            </div>
            <div className="pl-6">
              <button
                type="button"
                className="cursor-pointer text-gray-500"
                onClick={() => {
                  setSelectedFilters(filters)
                }}
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
        <DisclosurePanel className="border-t border-gray-200 py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block font-medium">Price</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {selectedFilters.price.map((option, optionIdx) => (
                    <div key={option.value} className="flex gap-3">
                      <div className="flex h-5 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            checked={selectedFilters.price[optionIdx].checked}
                            onChange={() => {
                              handleFilterChange('price', option.value)
                            }}
                            id={`price-${optionIdx}`}
                            name="price[]"
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
                        htmlFor={`price-${optionIdx}`}
                        className="text-base text-gray-600 sm:text-sm"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="block font-medium">Color</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {selectedFilters.color.map((option, optionIdx) => (
                    <div key={option.value} className="flex gap-3">
                      <div className="flex h-5 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            checked={selectedFilters.color[optionIdx].checked}
                            onChange={() => {
                              handleFilterChange('color', option.value)
                            }}
                            id={`color-${optionIdx}`}
                            name="color[]"
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
                        htmlFor={`color-${optionIdx}`}
                        className="text-base text-gray-600 sm:text-sm"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block font-medium">Tag</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {selectedFilters.tag.map((option, optionIdx) => (
                    <div key={option.value} className="flex gap-3">
                      <div className="flex h-5 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            checked={selectedFilters.tag[optionIdx].checked}
                            onChange={() => {
                              handleFilterChange('tag', option.value)
                            }}
                            id={`tag-${optionIdx}`}
                            name="tag[]"
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
                        htmlFor={`tag-${optionIdx}`}
                        className="text-base text-gray-600 sm:text-sm"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </DisclosurePanel>
        <div className="col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block">
              <div className="flex">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <button
                        onClick={() => {
                          handleSortChange(option.value)
                        }}
                        className={classNames(
                          option.value === sort
                            ? 'font-medium text-gray-900'
                            : 'text-gray-500',
                          'block w-full px-4 py-2 text-left text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                        )}
                      >
                        {option.name}
                      </button>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </Disclosure> */}

      <aside>
        <h2 className="sr-only">Filters</h2>
        {/* 
      <button
        type="button"
        className="inline-flex items-center lg:hidden"
      >
        <span className="text-sm font-medium text-gray-700">
          Filters
        </span>
        <PlusIcon
          aria-hidden="true"
          className="ml-1 size-5 shrink-0 text-gray-400"
        />
      </button> */}

        <div className="hidden lg:block">
          <form className="divide-y divide-gray-200">
            {Object.entries(selectedFilters).map(([key, section]) => (
              <div key={key} className="py-10 first:pt-0 last:pb-0">
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900">
                    {key}
                  </legend>
                  <div className="space-y-3 pt-6">
                    {section.map((option, optionIdx) => (
                      <div key={option.value} className="flex gap-3">
                        <div className="flex h-5 shrink-0 items-center">
                          <div className="group grid size-4 grid-cols-1">
                            <input
                              id={`${key}-${optionIdx}`}
                              name={key}
                              type="checkbox"
                              checked={option.checked}
                              onChange={() => {
                                handleFilterChange(key, option.value)
                              }}
                              className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-accent checked:bg-accent indeterminate:border-accent indeterminate:bg-accent focus:ring-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
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
                          htmlFor={`${key}-${optionIdx}`}
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
      </aside>
    </>
  )
}
