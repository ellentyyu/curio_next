'use client'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
export default function ProductSorter({ sortOptions, sort, setSort }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="group inline-flex cursor-pointer justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
        Sort
        <ChevronDownIcon
          aria-hidden="true"
          className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
        />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {sortOptions.map((option) => (
            <MenuItem key={option.label}>
              <button
                onClick={() => {
                  setSort(option)
                }}
                className={`block w-full cursor-pointer px-4 py-2 text-left text-sm data-focus:bg-gray-100 data-focus:outline-hidden ${
                  sort?.label === option.label
                    ? 'font-medium text-gray-900'
                    : 'text-gray-500'
                }`}
              >
                {option.label}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
