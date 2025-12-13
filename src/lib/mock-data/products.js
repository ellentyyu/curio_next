export const categories = [
  {
    id: 1,
    name: 'desk rituals',
    description:
      'Tools for people who pretend their desk is chaos but secretly care a lot. Containers, organizers, and objects that make sitting still feel intentional.',
    subcategories: [],
  },
  {
    id: 2,
    name: 'small obsessions',
    description:
      'Things you don’t need, but keep anyway. Accessories that exist somewhere between habit, comfort, and mild fixation.',
    subcategories: [],
  },
  {
    id: 3,
    name: 'portable lives',
    description:
      'Objects designed to move with you. For airports, trains, hotel rooms, and the feeling that you’re temporarily someone else.',
    subcategories: [],
  },
]

const defaultCategory = {
  id: 0,
  name: 'everything (for now)',
  description:
    'A loosely curated index of objects that don’t belong anywhere else yet. Some are practical, some are strange, all are here on purpose.',
  subcategories: [],
}

export const getCategories = async () => {
  return [defaultCategory, ...categories]
}

export const getCategoryData = async (givenCategory) => {
  if (!givenCategory) {
    return defaultCategory
  }
  return categories.find((category) => category.name === givenCategory)
}
