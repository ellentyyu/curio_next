import { useMemo } from 'react'
function useSortList(list, sort) {
  return useMemo(() => {
    return [...list].sort((a, b) => {
      const aValue = a?.[sort.key]
      const bValue = b?.[sort.key]
      if (aValue === null || bValue === null) return 0
      const result = aValue > bValue ? 1 : -1
      return sort.order === 'asc' ? result : -result
    })
  }, [list, sort.key, sort.order])
}

export default useSortList
