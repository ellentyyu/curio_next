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
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { loginUser } from '@/lib/actions/userActions'
import LoginForm from '@/components/user/LoginForm'
export default async function Login({ searchParams }) {
  const { redirectTo } = await searchParams
  const handleLogin = async (prevState, formData) => {
    'use server'
    const email = formData.get('email')
    const password = formData.get('password')

    const result = await loginUser({ email, password })
    if (!result.success) {
      return result
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
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm handleLogin={handleLogin} />

        <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          Not a member?{' '}
          <Link
            href={
              redirectTo
                ? `/register?redirectTo=${encodeURIComponent(redirectTo)}`
                : '/register'
            }
            className="font-semibold text-bluegreen hover:text-primary dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
