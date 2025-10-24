import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getCategories } from '@/lib/mock-data/products.js'
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
  const categories = await getCategories()
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
        <Header categories={categories} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
