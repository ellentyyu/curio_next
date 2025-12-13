'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
export default function NavLink({ category }) {
  const searchParams = useSearchParams()
  const searchCategory = searchParams.get('category') ?? 'everything (for now)'
  const isActive = searchCategory === category.name
  return (
    <Link
      key={category.name}
      href={
        category.id === 0 ? '/product' : `/product?category=${category.name}`
      }
      className={`text-md flex items-center hover:font-bold ${isActive ? 'font-bold' : ''}`}
    >
      {category.id === 0
        ? 'Everything'
        : `${category.name.charAt(0).toUpperCase()}${category.name.slice(1)}`}
    </Link>
  )
}
