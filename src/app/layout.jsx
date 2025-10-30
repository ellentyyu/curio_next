import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HydrationBridge from '@/components/layout/HydrationBridge'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { getCategories } from '@/lib/mock-data/products.js'
import { getProducts, seedProducts } from '@/lib/actions/productActions'
import { revalidatePath } from 'next/cache'
export const metadata = {
  title: {
    template: '%s - TaxPal',
    default: 'TaxPal - Accounting made simple for small businesses',
  },
  description:
    'Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default async function RootLayout({ children }) {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value
  const validToken = token ? verifyToken(token) : null
  let user = null

  if (validToken) {
    user = validToken.user
    console.log('layout user', user)
    // cart = validToken.cart
  }
  // else {
  //   await fetch('/api/auth/logout', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   revalidatePath('/')
  // }

  // can move to navbar component
  const categories = await getCategories()
  const products = await getProducts({})
  if (products.length === 0) {
    await seedProducts()
  }
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
      data-scroll-behavior="smooth"
    >
      <body className="flex h-full flex-col">
        <HydrationBridge user={user} />
        <Header categories={categories} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
