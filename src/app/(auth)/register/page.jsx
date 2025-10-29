import { AuthLayout } from '@/components/ui/auth-layout'
import { Button } from '@/components/ui/button'
import { Checkbox, CheckboxField } from '@/components/ui/checkbox'
import { Field, Label } from '@/components/ui/fieldset'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Strong, Text, TextLink } from '@/components/ui/text'
//import { Logo } from '@/components/UI/logo'
import Image from 'next/image'
import Link from 'next/link'
import { registerUser } from '@/lib/actions/userActions'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
export default async function Register({ searchParams }) {
  const { redirectTo } = await searchParams
  const handleRegister = async (formData) => {
    'use server'
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const result = await registerUser({ name, email, password })
    if (!result.success) {
      // TODO: add frontend toast notification
      console.log('register error', result.message)
      return { error: result.message }
    }
    const cookiesStore = await cookies()
    cookiesStore.set('token', result.data.token, {
      path: '/',
      httpOnly: true,
    })
    redirect(decodeURIComponent(redirectTo || '/product'))
  }
  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8 lg:py-30">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={100}
          height={100}
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto dark:hidden"
        />
        <Image
          width={100}
          height={100}
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto not-dark:hidden"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={handleRegister} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
