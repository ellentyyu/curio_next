'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export default function NavLink({ category }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchCategory = searchParams.get('category') ?? 'everything (for now)'
  const isActive = searchCategory === category.name
  const [isPending, startTransition] = useTransition()
  const href =
    category.id === 0 ? '/product' : `/product?category=${category.name}`
  return (
    <button
      onClick={() => {
        startTransition(() => {
          router.push(href)
        })
      }}
      className={`text-md flex cursor-pointer items-center hover:font-bold ${isActive || isPending ? 'font-bold' : ''}`}
    >
      {category.id === 0
        ? 'Everything'
        : `${category.name.charAt(0).toUpperCase()}${category.name.slice(1)}`}
    </button>
  )
}
