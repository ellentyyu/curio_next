'use client'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link'
import { UserIcon } from '@heroicons/react/24/outline'
import { logout } from '@/lib/domain/user/logout'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
export default function UserMenu() {
  const router = useRouter()
  const { userId } = useUserStore()
  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      // TODO: toast success
      console.log('logged out in user menu')
      router.refresh()
    } else {
      // TODO: toast error
    }
  }

  return (
    <>
      {userId ? (
        <Menu as="div" className="relative inline-block">
          <MenuButton className="ml-4 flex cursor-pointer items-center rounded-full p-2 text-gray-400 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-gray-400 dark:hover:text-gray-300 dark:focus-visible:outline-accent">
            <span className="sr-only">Open user options</span>
            <UserIcon aria-hidden="true" className="size-6" />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
          >
            <div className="py-1">
              <MenuItem>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                >
                  Orders
                </Link>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      ) : (
        <div className="ml-4 flow-root text-sm lg:relative">
          <Link href="/login" className="group flex items-center p-2">
            <UserIcon
              aria-hidden="true"
              className="size-6 shrink-0 text-gray-400 group-hover:text-gray-600"
            />
          </Link>
        </div>
      )}
    </>
  )
}
