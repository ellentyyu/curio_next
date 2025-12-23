import { Inter, Lexend, Mrs_Sheppards, Poppins } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HydrationBridge from '@/components/layout/HydrationBridge'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { getProducts, seedProducts } from '@/lib/actions/productActions'
import { getCartByUserId } from '@/lib/actions/cartActions'
export const metadata = {
  title: 'Curio Store',
  template: '%s | Curio Store',
  description: 'Shop for your quirkiness',
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

const mrs_sheppards = Mrs_Sheppards({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mrs-sheppards',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-poppins',
})
export default async function RootLayout({ children }) {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')?.value

  // token expiration breaks on dev mode so we need error handling
  let decodedToken
  try {
    decodedToken = token ? verifyToken(token) : null
  } catch (error) {
    console.error('verifyToken error', error)
    decodedToken = null
  }
  // const decodedToken = token ? verifyToken(token) : null
  let userId = null
  let cart = null

  if (decodedToken) {
    userId = decodedToken.id
    const result = await getCartByUserId(userId)
    if (result.success) {
      cart = result.data.items
    }
  }

  // seed products
  // let products = null
  const result = await getProducts({})
  if (result.success && result.data.products.length === 0) {
    await seedProducts()
  }
  // if (result.success) {
  //   products = result.data.products
  // }

  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-bg font-poppins text-dark antialiased',
        inter.variable,
        lexend.variable,
        mrs_sheppards.variable,
        poppins.variable,
      )}
      data-scroll-behavior="smooth"
    >
      <body className="flex h-full flex-col">
        <HydrationBridge userId={userId} cart={cart} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
