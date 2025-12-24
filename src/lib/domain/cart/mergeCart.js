export function mergeCartItems(serverItems = [], localItems = []) {
  const map = new Map()

  serverItems.forEach((item) => {
    const key = `${item.id}-${item.color?.join(',')}`
    map.set(key, { ...item })
  })

  localItems.forEach((item) => {
    const key = `${item.id}-${item.color?.join(',')}`
    if (map.has(key)) {
      map.get(key).quantity += item.quantity
    } else {
      map.set(key, { ...item })
    }
  })

  return Array.from(map.values())
}
