export const products = [
  {
    id: 1,
    name: 'Make yourself useful notebook',
    price: 100,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'workspace',
    subcategory: 'Subcategory 1',
    tags: ['new', 'sale', 'featured'],
    color: ['beige', 'black'],
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 234,
    name: 'Keychaaaaiiinn (Black)',
    price: 199,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-09.jpg',
    category: 'accessories',
    subcategory: 'Subcategory 2',
    tags: ['new', 'sale', 'featured'],
    color: ['beige', 'pink'],
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
  {
    id: 345,
    name: 'Out and About Bottle',
    price: 299,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-07.jpg',
    category: 'travel',
    subcategory: 'Subcategory 1',
    tags: ['new', 'objects', 'featured'],
    color: ['purple', 'white'],
    rating: 4.5,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 456,
    name: 'another travel product',
    price: 9,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
    category: 'travel',
    subcategory: 'Subcategory 1',
    tags: ['new', 'sale', 'tees'],
    color: ['blue', 'green'],
    rating: 4.5,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const categories = [
  {
    id: 1,
    name: 'workspace',
    description:
      "The secret to a tidy desk? Don't get rid of anything, just put it in really really nice looking containers.",
    subcategories: [
      {
        id: 1,
        name: 'Subcategory 1',
      },
      {
        id: 2,
        name: 'Subcategory 2',
      },
    ],
  },
  {
    id: 2,
    name: 'accessories',
    description:
      "We don't wear accessories to go with clothes; we wear accessories to be ourselves.",
    subcategories: [
      {
        id: 1,
        name: 'Subcategory 1',
      },
      {
        id: 2,
        name: 'Subcategory 2',
      },
    ],
  },
  {
    id: 3,
    name: 'travel',
    description: 'Travel is the only thing you buy that makes you richer.',
    subcategories: [
      {
        id: 1,
        name: 'Subcategory 1',
      },
      {
        id: 2,
        name: 'Subcategory 2',
      },
    ],
  },
]

const defaultCategory = {
  id: 0,
  name: 'Hello, beautiful!',
  description:
    'Looking for something special? Find the hidden gems in our collection.',
  subcategories: [],
}

export const productDetails = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
    image: 'https://via.placeholder.com/150',
    gallery: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    category: 'workspace',
    subcategory: 'Subcategory 1',
    tags: ['new', 'sale', 'featured'],
    color: ['beige', 'black'],
    brand: 'Brand 1',
    rating: 4.5,
    reviewCount: 2341,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const getProducts = async ({ category, price, color, tag }) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  let filteredProducts = JSON.parse(JSON.stringify(products))
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category,
    )
  }
  if (price) {
    // TODO: Handle price range
    const selectedPrice = price.split(',')
    filteredProducts = filteredProducts.filter((product) =>
      selectedPrice.some((p) => product.price >= p),
    )
  }
  if (color) {
    const selectedColors = color.split(',')
    filteredProducts = filteredProducts.filter((p) =>
      selectedColors.some((c) => p.color.includes(c)),
    )
  }
  if (tag) {
    const selectedTags = tag.split(',')
    filteredProducts = filteredProducts.filter((product) =>
      selectedTags.some((t) => product.tags.includes(t)),
    )
  }
  return filteredProducts
}

export const getCategories = async () => {
  return categories
}

export const getProductDetails = async (id) => {
  return productDetails.find((product) => product.id === id)
}
export const getCategoryData = async (givenCategory) => {
  if (!givenCategory) {
    return defaultCategory
  }
  return categories.find((category) => category.name === givenCategory)
}
