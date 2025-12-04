'use client'
import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'

const initialState = {
  success: true,
  error: null,
}
export default function LoginForm({ handleLogin }) {
  const { pending } = useFormStatus()
  const [state, action, actionPending] = useActionState(
    handleLogin,
    initialState,
  )
  return (
    <form action={action} className="space-y-6">
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
            className="focus:-outline-offset-transparent block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
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
          {/* TODO: add forgot password functionality */}
          {/* <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-bluegreen hover:text-primary dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Forgot password?
            </a>
          </div> */}
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="focus:-outline-offset-transparent block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="flex w-full cursor-pointer justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default disabled:bg-primary/50 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        disabled={actionPending}
      >
        {actionPending ? 'Signing in...' : 'Sign in'}
      </button>
      {state.success === false && (
        <p className="text-center text-sm text-red-500">
          {state.error.message}
        </p>
      )}
    </form>
  )
}
