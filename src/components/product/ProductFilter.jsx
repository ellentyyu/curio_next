'use client'
import { useEffect, useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { startTransition } from 'react'
const filters = {
  price: [
    { value: '0-25', label: '$0 - $25', checked: false },
    { value: '25-50', label: '$25 - $50', checked: false },
    { value: '50-75', label: '$50 - $75', checked: false },
    { value: '75+', label: '$75+', checked: false },
  ],
  color: [
    { value: 'beige', label: 'Beige', checked: false },
    { value: 'black', label: 'Black', checked: false },
    { value: 'pink', label: 'Pink', checked: false },
    { value: 'turquoise', label: 'Turquoise', checked: false },
    { value: 'purple', label: 'Purple', checked: false },
    { value: 'unicorn', label: 'Unicorn', checked: false },
  ],
  tag: [
    { value: 'new', label: 'New', checked: false },
    { value: 'sale', label: 'Sale', checked: false },
    { value: 'featured', label: 'Featured', checked: false },
  ],
}

export default function ProductFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedFilters, setSelectedFilters] = useState(() =>
    structuredClone(filters),
  )

  const handleFilterChange = (filter, value) => {
    const params = new URLSearchParams(searchParams)

    const current = params.get(filter)?.split(',') ?? []
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]

    if (next.length > 0) params.set(filter, next.join(','))
    else params.delete(filter)

    startTransition(() => {
      router.replace(`/product?${params.toString()}`, { scroll: false })
    })
  }

  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')

  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sort)
    router.replace(`/product?${params.toString()}`, { scroll: false })
  }
  // sync url params to selected filters
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries())
    setSelectedFilters((prev) => {
      const updatedFilters = structuredClone(prev)

      for (let filter in updatedFilters) {
        const active = params[filter]?.split(',') ?? []
        updatedFilters[filter] = updatedFilters[filter].map((option) => ({
          ...option,
          checked: active.includes(option.value),
        }))
      }
      return updatedFilters
    })

    setSort(params.sort || 'newest')
  }, [searchParams])

  return (
    <>
      <aside>
        <h2 className="sr-only">Filters</h2>
        <div className="hidden lg:block">
          <form className="divide-y divide-gray-200">
            {Object.entries(selectedFilters).map(([key, section]) => (
              <div key={key} className="py-10 first:pt-0 last:pb-0">
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900">
                    {key}
                  </legend>
                  <div className="space-y-3 pt-6">
                    {section.map((option, optionIdx) => (
                      <div key={option.value} className="flex gap-3">
                        <div className="flex h-5 shrink-0 items-center">
                          <div className="group grid size-4 grid-cols-1">
                            <input
                              id={`${key}-${optionIdx}`}
                              name={key}
                              type="checkbox"
                              checked={option.checked}
                              onChange={() => {
                                handleFilterChange(key, option.value)
                              }}
                              className="col-start-1 row-start-1 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white checked:border-accent checked:bg-accent indeterminate:border-accent indeterminate:bg-accent focus:ring-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                            />
                            <svg
                              fill="none"
                              viewBox="0 0 14 14"
                              className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            >
                              <path
                                d="M3 8L6 11L11 3.5"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-checked:opacity-100"
                              />
                              <path
                                d="M3 7H11"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-indeterminate:opacity-100"
                              />
                            </svg>
                          </div>
                        </div>
                        <label
                          htmlFor={`${key}-${optionIdx}`}
                          className="cursor-pointer text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            ))}
          </form>
        </div>
      </aside>
    </>
  )
}
