import Link from 'next/link'
import { getProducts, getCachedProducts } from '@/lib/actions/productActions'
import Image from 'next/image'
import ProductGridClient from './ProductGridClient'
import ProductGrid from './ProductGrid'
export default async function ProductWrapper({
  category,
  price,
  color,
  tag,
  sort,
}) {
  // get server data
  const result = await getCachedProducts({ category, price, color, tag, sort })
  if (!result.success) {
    return <div>Error: {result.message}</div>
  }
  const products = result.data.products

  return (
    <section
      aria-labelledby="products-heading"
      className="mx-auto max-w-2xl lg:max-w-7xl"
    >
      <h2 className="sr-only">Products</h2>
      {/* 1. client rendered grid */}
      <ProductGridClient products={products} />
      {/* 2. server rendered grid */}
      {/* <ProductGrid products={products} /> */}
    </section>
  )
}
