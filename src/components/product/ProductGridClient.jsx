'use client'
import { useState } from 'react'
import useSortList from '@/hooks/useSortList'
import ProductSorter from './ProductSorter'
import ProductGrid from './ProductGrid'
const sortOptions = [
  { label: 'Newest', key: 'createdAt', order: 'desc' },
  { label: 'Price: Low to High', key: 'price', order: 'asc' },
  { label: 'Price: High to Low', key: 'price', order: 'desc' },
]
export default function ProductGridClient({ products }) {
  const [sort, setSort] = useState(sortOptions[0])
  const sortedProducts = useSortList(products, sort)
  return (
    <div>
      <div className="flex justify-end">
        <ProductSorter
          sortOptions={sortOptions}
          sort={sort}
          setSort={setSort}
        />
      </div>
      <div className="mt-4">
        {sortedProducts.length > 0 ? (
          <ProductGrid products={sortedProducts} />
        ) : (
          <div className="text-center text-gray-500">No products found</div>
        )}
      </div>
    </div>
  )
}
